import { Test, TestingModule } from '@nestjs/testing';
import { OrgsService } from './orgs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../ormconfig';
import { HttpModule } from '@nestjs/common';
import { Org } from './orgs.entity';
import { OrgResolver } from './orgs.resolver';
import { OrgsController } from './orgs.controller';
import { OrgsModule } from './orgs.module';

describe('OrgsService', () => {
  let service: OrgsService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [OrgsModule, TypeOrmModule.forRoot(ormconfig)],
    }).compile();

    service = module.get<OrgsService>(OrgsService);
  });

  afterAll(async () => {
    module.close();
  });

  it('should be defined', async () => {
    expect(await service.findAllOrgs('testtoken')).toBeDefined();
  });
});
