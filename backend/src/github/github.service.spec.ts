import { Test, TestingModule } from '@nestjs/testing';
import { GithubService } from './github.service';

import { GithubModule } from './github.module';
import { Installation } from './installation';

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
        'https://api.github.com/app/installations/7504858/access_tokens',
      );
      expect(output.statusText).toBe('Created');
    });
  });

  describe('getAsInstallation', () => {
    it('should be able to successfully return data from an endpoint requiring auth as an installation', async () => {
      const output = await github.getAsInstallation(
        7504858,
        'https://api.github.com/installation/repositories',
      );
      expect(output.statusText).toBe('OK');
    });
  });

  describe('getAllInstallations', () => {
    it('should return an array of all installations in Github as an array of IDs', async () => {
      const installations: Array<Installation> = await github.getAllInstallations();
      expect(installations.length).toBeGreaterThan(0);
    });
  });
});
