import { Test, TestingModule } from '@nestjs/testing';
import { InstallationsService } from './installations.service';
import { Repo } from '../repos/repos.entity';
import { ConfigModule } from '../config/config.module';
import { HttpModule, HttpService } from '@nestjs/common';
import { Installation } from './installation';

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
      const githubAppToken = service.getGitHubAppToken();
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

  // Retrieves all installations of Adde from Github
  describe('getInstallations', () => {
    it('should return an array of all installations in Github as an array of IDs', async () => {
      const installations: Array<Installation> = await service.getInstallations();
      expect(installations.length).toBeGreaterThan(0);
    });
  });

  // Retrieves an individual installation token
  describe('getInstallationToken', () => {
    it('should return an array of every repo across all org installations', async () => {
      const githubInstallationToken = await service.getGithubInstallationToken(
        7504858,
      );
      // https://api.github.com/app/installations
      // const testApiCall = await httpService
      //   .get('https://api.github.com/app/installation/repositories', {
      //     headers: {
      //       Authorization: `Bearer ${githubInstallationToken}`,
      //       Accept: 'application/vnd.github.mercy-preview+json',
      //     },
      //   })
      //   .toPromise();
      expect(githubInstallationToken).toBe('lla');
    });
  });
});
// https://api.github.com/installation/repositories
