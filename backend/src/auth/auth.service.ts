import {
  HttpService,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { GithubCallback } from './githubCallback.dto';
import { ConfigService } from '@nestjs/config';
import queryString from 'querystring';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  private readonly logger = new Logger(AuthService.name);
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
}
