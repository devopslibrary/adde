import { Test, TestingModule } from '@nestjs/testing';
import { OrgsService } from './orgs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../ormconfig';
import { HttpModule } from '@nestjs/common';
import { Org } from './orgs.entity';
import { Setting } from '../settings/settings.entity';
import { OrgResolver } from './orgs.resolver';
import { OrgsController } from './orgs.controller';

describe('OrgsService', () => {
  let service: OrgsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([Org, Setting]),
        TypeOrmModule.forRoot(ormconfig),
        HttpModule,
      ],
      providers: [OrgsService, OrgResolver],
      controllers: [OrgsController],
    }).compile();

    service = module.get<OrgsService>(OrgsService);
  });

  it('should be defined', async () => {
    expect(await service.findAllOrgs('testtoken')).toBeDefined();
  });
});
