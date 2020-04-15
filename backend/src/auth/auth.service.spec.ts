import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthModule } from './auth.module';
import { ConfigModule } from '../config/config.module';
import nock from 'nock';
import nockGithubUserInstallations from '../../test/fixtures/github_user_installations.json';
import nockGithubUserInstallationsEmpty from '../../test/fixtures/github_user_installations_empty.json';
import nockGithubUserInstallationRepositories from '../../test/fixtures/github_user_installation_repositories.json';
import nockGithubUser from '../../test/fixtures/github_user.json';

describe('AuthService', () => {
  let service: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, ConfigModule],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  // validateUser
  describe('validateUser', () => {
    nock('https://api.github.com')
      .get('/user')
      .reply(200, nockGithubUser);
    it('should return user information if user exists', async () => {
      const token = 'testbearertoken';
      const user = await service.validateUser(token);
      expect(user).toHaveProperty('avatar_url');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('login');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('token');
    });
  });

  // getUserRepoInstallations returns all user repo installations
  describe('getUserRepoInstallations', () => {
    // Mock the call to get user installations
    nock('https://api.github.com')
      .get('/user/installations')
      .reply(200, nockGithubUserInstallations);
    // Mock the call that returns all the repositories
    nock('https://api.github.com')
      .get('/user/installations/7958959/repositories')
      .reply(200, nockGithubUserInstallationRepositories);
    it('should return all user repo installs if they have any', async () => {
      const githubUser = {
        token: '75a47c8e2069a60c9cb3a73b925ddc18dd71146b',
        provider: 'github',
        user_id: 5382669,
        connection: 'github',
        isSocial: true,
      };
      const repos = await service.getUserRepoInstallations(githubUser);
      expect(repos[0]).toHaveProperty('id');
      expect(repos[0]).toHaveProperty('name');
      expect(repos[0]).toHaveProperty('node_id');
      expect(repos[0]).toHaveProperty('full_name');
      expect(repos[0]).toHaveProperty('owner');
      expect(repos[0]).toHaveProperty('permissions');
    });
  });

  // getUserInstallations
  describe('getUserInstallations', () => {
    it('should return an array of installations for the user if they have any', async () => {
      nock('https://api.github.com')
        .get('/user/installations')
        .reply(200, nockGithubUserInstallations);
      const githubUser = {
        token: 'madeUpToken',
        provider: 'github',
        user_id: 5382669,
        connection: 'github',
        isSocial: true,
      };
      const installations = await service.getUserInstallations(githubUser);
      expect(installations[0]).toHaveProperty('account');
      expect(installations[0]).toHaveProperty('id');
      expect(installations.length).toBe(1);
    });
    it('should return an empty array for the user if they do not', async () => {
      nock('https://api.github.com')
        .get('/user/installations')
        .reply(200, nockGithubUserInstallationsEmpty);
      const githubUser = {
        token: 'madeUpToken',
        provider: 'github',
        user_id: 5382669,
        connection: 'github',
        isSocial: true,
      };
      const installations = await service.getUserInstallations(githubUser);
      expect(installations.length).toBe(0);
      expect(installations).toEqual([]);
    });
  });
});
