import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { ConfigService } from '../config/config.service';
import { Injectable, UnauthorizedException, HttpService } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private config: ConfigService,
    private readonly _httpService: HttpService,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${config.get('AUTH0_DOMAIN')}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 1
      audience: config.get('AUTH0_AUDIENCE'),
      issuer: `https://${config.get('AUTH0_DOMAIN')}/`,
    });
  }

  // Management Token is used to retrieve Github User from Auth0
  async onModuleInit() {}

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    console.log(this.config.get('AUTH0_CLIENT_ID'));
    if (!this._managementToken) {
      this._managementToken = await this._httpService
        .post('https://devopslibrary.auth0.com/oauth/token', {
          client_id: this.config.get('AUTH0_CLIENT_ID'),
          client_secret: this.config.get('AUTH0_CLIENT_SECRET'),
          grant_type: 'client_credentials',
          audience: 'https://' + this.config.get('AUTH0_DOMAIN') + '/api/v2/',
        })
        .pipe(map(response => response.data.access_token))
        .toPromise();
    }
    console.log(this._managementToken);

    const auth0User = payload.sub;
    console.log(auth0User);
    const githubUser = await this._httpService
      .get(
        'https://' +
          this.config.get('AUTH0_DOMAIN') +
          '/api/v2/users/' +
          auth0User,
        {
          headers: { Authorization: `Bearer ${this._managementToken}` },
        },
      )
      .toPromise();
    console.log(githubUser.data.identities[0]);
    if (!payload) {
      done(new UnauthorizedException(), false); // 2
    }

    payload['githubUser'] = githubUser.data.identities[0];
    return done(null, payload);
  }
}
