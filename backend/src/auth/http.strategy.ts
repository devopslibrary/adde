import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { AuthService } from './auth.service';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(payload: string) {
    let user;
    user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
