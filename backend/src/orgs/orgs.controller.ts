import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

@Controller('orgs')
export class OrgsController {
  constructor() {}
  @UseGuards(AuthGuard('jwt'))
  @Get()
  orgs(): string {
    return 'This action returns all cats';
  }
}
