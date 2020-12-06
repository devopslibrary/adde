import {
  HttpService,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { GithubCallback } from './interfaces/githubCallback.interface';
import { ConfigService } from '@nestjs/config';
import queryString from 'querystring';
import { Installation } from './interfaces/installation.interface';
import { Role } from './interfaces/role.enum';
import { User } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  // Validates user has the proper access to a repository
  public async userHasAccess(
    githubUser: User,
    role: Role,
    account,
    repo,
  ): Promise<boolean> {
    const usersPermissionsOnRepo = await this.httpService
      .get(
        'https://api.github.com/repos/' +
          account +
          '/' +
          repo +
          '/collaborators/' +
          githubUser.login +
          '/permission',
        {
          headers: {
            Authorization: `Bearer ${githubUser.token}`,
            Accept: 'application/vnd.github.machine-man-preview+json',
          },
        },
      )
      .toPromise()
      .then(response => {
        return response.data.permission;
      });
    switch (role) {
      case Role.admin: {
        return usersPermissionsOnRepo == 'admin';
      }
      case Role.write: {
        return (
          usersPermissionsOnRepo == 'admin' || usersPermissionsOnRepo == 'write'
        );
      }
      case Role.read: {
        return (
          usersPermissionsOnRepo == 'admin' ||
          usersPermissionsOnRepo == 'write' ||
          usersPermissionsOnRepo == 'read'
        );
      }
    }
  }

  // Validates that user is valid by querying Github API
  public async validateUser(tokenParam): Promise<User> {
    try {
      const response = await this.httpService
        .get('https://api.github.com/user', {
          headers: { Authorization: `Bearer ${tokenParam}` },
        })
        .toPromise();
      const user: User = {
        token: tokenParam,
        login: response.data.login,
        id: response.data.id,
        avatar_url: response.data.avatar_url,
        name: response.data.name,
        email: response.data.email,
      };
      return user;
    } catch {
      this.logger.log(
        'User attempted to call API and received unauthorized from Github',
      );
      throw new UnauthorizedException();
    }
  }

  // Logs user in using Github
  public login(githubCallback: GithubCallback): Promise<string> {
    return this.httpService
      .post('https://github.com/login/oauth/access_token', {
        client_id: this.configService.get('GITHUB_CLIENT_ID'),
        client_secret: this.configService.get('GITHUB_CLIENT_SECRET'),
        code: githubCallback.code,
        redirect_uri: this.configService.get('CALLBACK_URL'),
        state: githubCallback.state,
      })
      .toPromise()
      .then(output => {
        const accessToken = queryString.parse(output.data).access_token;
        if (accessToken) {
          this.logger.log('User logged in and received AuthToken.');
          return accessToken.toString();
        } else {
          this.logger.log(
            'User attempted to login but failed to receive access token.',
          );
          throw new UnauthorizedException();
        }
      });
  }

  // Get all repo installations a user has access to
  public getUserRepoInstallations(githubUser: User) {
    return this.getUserInstallations(githubUser).then(async installations => {
      const userRepoInstallations = [];
      await Promise.all(
        installations.map(async installation => {
          try {
            const response = await this.httpService
              .get(
                'https://api.github.com/user/installations/' +
                  installation.id +
                  '/repositories',
                {
                  headers: {
                    Authorization: `Bearer ${githubUser.token}`,
                    Accept: 'application/vnd.github.machine-man-preview+json',
                  },
                },
              )
              .toPromise();
            userRepoInstallations.push.apply(
              userRepoInstallations,
              response.data.repositories,
            );
          } catch {
            this.logger.log(
              'Unable to retrieve some repo installations because user did not authorize SSO.',
            );
          }
        }),
      );
      return userRepoInstallations;
    });
  }

  // Return all installations a user has access to
  public getUserInstallations(githubUser: User): Promise<Installation[]> {
    return this.httpService
      .get('https://api.github.com/user/installations', {
        headers: {
          Authorization: `Bearer ${githubUser.token}`,
          Accept: 'application/vnd.github.machine-man-preview+json',
        },
      })
      .toPromise()
      .then(response => {
        return response.data.installations;
      });
  }
}
