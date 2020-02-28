import { Test, TestingModule } from '@nestjs/testing';
import { OrgsService } from './orgs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../ormconfig';
import { OrgsModule } from './orgs.module';

describe('OrgsService', () => {
  let service: OrgsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrgsModule, TypeOrmModule.forRoot(ormconfig)],
    }).compile();

    service = module.get<OrgsService>(OrgsService);
  });

  it('should be defined', async () => {
    await expect(service.findAllOrgs('testtoken')).toBeDefined();
  });
});
