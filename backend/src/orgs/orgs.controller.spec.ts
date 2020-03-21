import { Test, TestingModule } from '@nestjs/testing';
import { OrgsController } from './orgs.controller';
import { HttpModule } from '@nestjs/common';

describe('Orgs Controller', () => {
  let controller: OrgsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [OrgsController],
    }).compile();

    controller = module.get<OrgsController>(OrgsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
