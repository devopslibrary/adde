import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { Request } from 'express';
import { Setting } from './settings.entity';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingService: SettingsService) {}

  @Get()
  async findAllSettings(@Req() request: Request): Promise<Setting[]> {
    return this.settingService.findAllSettings();
  }

  @Post()
  async createSettings(@Body() setting: Setting) {
    this.settingService.upsertSetting(setting);
  }
}
