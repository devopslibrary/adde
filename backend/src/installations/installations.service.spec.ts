import { Test, TestingModule } from '@nestjs/testing';
import { InstallationsService } from './installations.service';
import { Repo } from '../repos/repos.entity';

describe('InstallationsService', () => {
  let service: InstallationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstallationsService],
    }).compile();

    service = module.get<InstallationsService>(InstallationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getInstallations', () => {
    it('should return an array of all installations in Github as an array of IDs', async () => {
      expect(await service.getInstallations()).toBe([1234, 5678]);
    });
  });
  describe('getAllInstallationRepos', () => {
    it('should return an array of every repo across all org installations', async () => {
      const sampleRepo = new Repo();
      sampleRepo.defaultBranch = 'master';
      sampleRepo.fullName = 'sampledata';
      sampleRepo.id = 12345;
      sampleRepo.name = 'sampledata';
      const expectedArray = [sampleRepo];
      expect(await service.getAllInstallationRepos).toBe(expectedArray);
    });
  });
});
