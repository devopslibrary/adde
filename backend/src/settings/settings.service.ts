import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './settings.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Repository } from 'typeorm';

@Resolver('Settings')
@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  @Mutation(returns => Setting)
  async upsertSetting(@Args('setting') setting: Setting) {
    // If not exists, create settings as well.
    return this.settingRepository.save(setting);
  }

  @Query(returns => Setting)
  async findAllSettings(): Promise<Setting[]> {
    return await this.settingRepository.find();
  }
}
