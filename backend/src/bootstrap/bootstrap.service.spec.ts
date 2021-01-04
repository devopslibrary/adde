import { Test, TestingModule } from '@nestjs/testing';
import { BootstrapService } from './bootstrap.service';
import { BootstrapModule } from './bootstrap.module';

describe('BootstrapService', () => {
  let service: BootstrapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BootstrapModule],
    }).compile();

    service = module.get<BootstrapService>(BootstrapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
