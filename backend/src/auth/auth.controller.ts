import { Controller, Post, Param, Body } from '@nestjs/common';
import { GithubCallback } from './githubCallback.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() githubCallback: GithubCallback) {
    return this.authService.login(githubCallback);
  }
}
