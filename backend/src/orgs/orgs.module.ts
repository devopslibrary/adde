import { Module } from '@nestjs/common';
import { OrgsService } from './orgs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Org } from './orgs.entity';
import { Setting } from '../settings/settings.entity';
import { OrgResolver } from './orgs.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Org, Setting])],
  providers: [OrgsService, OrgResolver],
  exports: [OrgsModule],
})
export class OrgsModule {}
