import { Module } from '@nestjs/common';
import { OrgsService } from './orgs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Org } from './orgs.entity';
import { OrgResolver } from './orgs.resolver';
import { OrgsController } from './orgs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Org])],
  providers: [OrgsService, OrgResolver],
  exports: [OrgsModule],
  controllers: [OrgsController],
})
export class OrgsModule {}
