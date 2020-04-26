import { Test, TestingModule } from '@nestjs/testing';
import { GithubService } from './github.service';
import { GithubModule } from './github.module';
import { GithubInstallation } from './githubInstallation';

describe('GithubService', () => {
  let github: GithubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GithubModule],
    }).compile();

    github = module.get<GithubService>(GithubService);
  });

  it('should be defined', () => {
    expect(github).toBeDefined();
  });

  describe('getAsApp', () => {
    it('should be able to successfully return data from an endpoint requiring auth as an application', async () => {
      const output = await github.getAsApp(
        'https://api.github.com/app/installations',
      );
      expect(output.status).toBe(200);
    });
  });

  describe('postAsApp', () => {
    it('should be able to successfully return data from an endpoint requiring auth as an application', async () => {
      const output = await github.postAsApp(
        'https://api.github.com/app/installations/8370033/access_tokens',
      );
      expect(output.statusText).toBe('Created');
    });
  });

  describe('getAsInstallation', () => {
    it('should be able to successfully return data from an endpoint requiring auth as an installation', async () => {
      const output = await github.getAsInstallation(
        8370033,
        'https://api.github.com/installation/repositories',
      );
      expect(output.statusText).toBe('OK');
    });
  });

  describe('getAllRepos', () => {
    it('should return an array of all repos across all installations', async () => {
      const allRepos = await github.getAllRepos();
      expect(allRepos.length).toBeGreaterThan(0);
      expect(allRepos[0]).toHaveProperty('full_name');
    }, 10000);
  });

  describe('getAllInstallations', () => {
    it('should return an array of all installations in Github as an array of IDs', async () => {
      const installations: GithubInstallation[] = await github.getAllInstallations();
      expect(installations.length).toBeGreaterThan(0);
    });
  });
});
