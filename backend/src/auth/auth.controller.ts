import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { GithubCallback } from './interfaces/githubCallback.interface';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GithubUser } from './githubUser.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() githubCallback: GithubCallback) {
    return this.authService.login(githubCallback);
  }

  // Get User installations
  @Get('/repositories')
  @UseGuards(AuthGuard('bearer'))
  getUserRepoInstallations(@GithubUser() githubUser: any) {
    return this.authService.getUserRepoInstallations(githubUser);
  }
}
