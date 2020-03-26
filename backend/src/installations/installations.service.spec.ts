import { Test, TestingModule } from '@nestjs/testing';
import { InstallationsService } from './installations.service';
import { Repo } from '../repos/repos.entity';
import { ConfigModule } from '../config/config.module';
import { HttpModule, HttpService } from '@nestjs/common';

describe('InstallationsService', () => {
  let service: InstallationsService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstallationsService],
      imports: [ConfigModule, HttpModule],
    }).compile();

    service = module.get<InstallationsService>(InstallationsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getGitHubAppToken', () => {
    it('should retrieve a machine installation JWT capable of authing to Github', async () => {
      const githubAppToken = await service.getGitHubAppToken();
      const testApiCall = await httpService
        .get('https://api.github.com/app/installations', {
          headers: {
            Authorization: `Bearer ${githubAppToken}`,
            Accept: 'application/vnd.github.machine-man-preview+json',
          },
        })
        .toPromise();
      expect(testApiCall.status).toBe(200);
    });
  });
  // describe('getInstallations', () => {
  //   it('should return an array of all installations in Github as an array of IDs', async () => {
  //     expect(await service.getInstallations()).toBe([1234, 5678]);
  //   });
  // });
  // describe('getAllInstallationRepos', () => {
  //   it('should return an array of every repo across all org installations', async () => {
  //     const sampleRepo = new Repo();
  //     sampleRepo.defaultBranch = 'master';
  //     sampleRepo.fullName = 'sampledata';
  //     sampleRepo.id = 12345;
  //     sampleRepo.name = 'sampledata';
  //     const expectedArray = [sampleRepo];
  //     expect(await service.getAllInstallationRepos).toBe(expectedArray);
  //   });
  // });
});
