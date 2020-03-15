import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '../config/config.service';
import { Injectable, UnauthorizedException, HttpService } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
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

  async validate(payload: JwtPayload) {
    if (!payload) {
      throw new UnauthorizedException(); // 2
    }
    return payload;
  }
}

// export async function getUser(authToken, userId): Promise<UserModel> {
//   const options = {
//     method: 'GET',
//     url: 'https://devopslibrary.auth0.com/api/v2/users/github|' + userId,
//     headers: {
//       'content-type': 'application/json',
//       'authorization': 'Bearer ' + authToken,
//     },
//   };
//   const result = await request(options, error => {
//     if (error) {
//       throw new Error(error);
//     }
//   });
//   const parsedJson = JSON.parse(result);
//   return new UserModel(
//     parsedJson.name,
//     parsedJson.email,
//     parsedJson.nickname,
//     parsedJson.user_id,
//     parsedJson.identities[0].access_token,
//   );
// }

// console.log(this.config.get('AUTH0_CLIENT_ID'));
// if (!this._managementToken) {
//   this._managementToken = await this._httpService
//     .post('https://devopslibrary.auth0.com/oauth/token', {
//       client_id: this.config.get('AUTH0_CLIENT_ID'),
//       client_secret: this.config.get('AUTH0_CLIENT_SECRET'),
//       grant_type: 'client_credentials',
//       audience: 'https://' + this.config.get('AUTH0_DOMAIN') + '/api/v2/',
//     })
//     .pipe(map(response => response.data.access_token))
//     .toPromise();
// }
// console.log(this._managementToken);
// const auth0User = payload.sub;
// console.log(auth0User);
// const githubUser = await this._httpService
//   .get(
//     'https://' +
//       this.config.get('AUTH0_DOMAIN') +
//       '/api/v2/users/' +
//       auth0User,
//     {
//       headers: { Authorization: `Bearer ${this._managementToken}` },
//     },
//   )
//   .toPromise();
// // console.log(githubUser);
