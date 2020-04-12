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

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  public async validateUser(tokenParam) {
    const response = await this.httpService
      .get('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${tokenParam}` },
      })
      .toPromise();
    const user = {
      token: tokenParam,
      login: response.data.login,
      id: response.data.id,
      avatar_url: response.data.avatar_url,
      name: response.data.name,
      email: response.data.email,
    };
    return user;
  }
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

  // Return all installations a user has access to
  public getUserInstallations(githubUser): Promise<Installation[]> {
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
