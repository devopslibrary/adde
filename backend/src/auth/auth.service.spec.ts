import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthModule } from './auth.module';
import { ConfigModule } from '../config/config.module';
import nock from 'nock';
import nockGithubUserInstallations from '../../test/fixtures/github_user_installations.json';
import nockGithubUserInstallationsEmpty from '../../test/fixtures/github_user_installations_empty.json';
import nockGithubUserInstallationRepositories from '../../test/fixtures/github_user_installation_repositories.json';
import nockGithubUserInstallationRepositoriesBlockedBySSO from '../../test/fixtures/github_check_user_installation_repositories_blocked_by_sso.json';
import nockGithubUser from '../../test/fixtures/github_user.json';
import nockGithubAdminUser from '../../test/fixtures/github_check_permissions_admin_user.json';
import nockGithubReadUser from '../../test/fixtures/github_check_permissions_read_user.json';
import nockGithubWriteUser from '../../test/fixtures/github_check_permissions_write_user.json';
import { User } from './interfaces/user.interface';
import { Role } from './interfaces/role.enum';

describe('AuthService', () => {
  let service: AuthService;
  const githubUser: User = {
    token: 'madeUpToken',
    login: 'testuser',
    id: 5382669,
    avatar_url: 'https://avatarurl',
    name: 'Test User',
    email: 'test@gmail.com',
  };
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, ConfigModule],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  // userHasAccess
  describe('userHasAccess', () => {
    // Admin User
    it('should allow an admin user permission to read', async () => {
      nock('https://api.github.com')
        .get(
          '/repos/devopslibrary/sampledata/collaborators/testuser/permission',
        )
        .reply(200, nockGithubAdminUser);
      const testRead = await service.userHasAccess(
        githubUser,
        Role.read,
        'devopslibrary',
        'sampledata',
      );
      expect(testRead).toBe(true);
    });
    it('should allow an admin user permission to write', async () => {
      nock('https://api.github.com')
        .get(
          '/repos/devopslibrary/sampledata/collaborators/testuser/permission',
        )
        .reply(200, nockGithubAdminUser);
      const testWrite = await service.userHasAccess(
        githubUser,
        Role.write,
        'devopslibrary',
        'sampledata',
      );
      expect(testWrite).toBe(true);
    });
    it('should allow an admin user permission to admin', async () => {
      nock('https://api.github.com')
        .get(
          '/repos/devopslibrary/sampledata/collaborators/testuser/permission',
        )
        .reply(200, nockGithubAdminUser);
      const testAdmin = await service.userHasAccess(
        githubUser,
        Role.admin,
        'devopslibrary',
        'sampledata',
      );
      expect(testAdmin).toBe(true);
    });
    // Read user
    it('should allow a read user permission to read', async () => {
      nock('https://api.github.com')
        .get(
          '/repos/devopslibrary/sampledata/collaborators/testuser/permission',
        )
        .reply(200, nockGithubReadUser);
      const testRead = await service.userHasAccess(
        githubUser,
        Role.read,
        'devopslibrary',
        'sampledata',
      );
      expect(testRead).toBe(true);
    });
    it('should disallow a read user permission to write', async () => {
      nock('https://api.github.com')
        .get(
          '/repos/devopslibrary/sampledata/collaborators/testuser/permission',
        )
        .reply(200, nockGithubReadUser);
      const testWrite = await service.userHasAccess(
        githubUser,
        Role.write,
        'devopslibrary',
        'sampledata',
      );
      expect(testWrite).toBe(false);
    });
    it('should disallow a read user permission to admin', async () => {
      nock('https://api.github.com')
        .get(
          '/repos/devopslibrary/sampledata/collaborators/testuser/permission',
        )
        .reply(200, nockGithubReadUser);
      const testAdmin = await service.userHasAccess(
        githubUser,
        Role.admin,
        'devopslibrary',
        'sampledata',
      );
      expect(testAdmin).toBe(false);
    });
    // Write user
    it('should allow a write user permission to read', async () => {
      nock('https://api.github.com')
        .get(
          '/repos/devopslibrary/sampledata/collaborators/testuser/permission',
        )
        .reply(200, nockGithubWriteUser);
      const testRead = await service.userHasAccess(
        githubUser,
        Role.read,
        'devopslibrary',
        'sampledata',
      );
      expect(testRead).toBe(true);
    });
    it('should allow a write user permission to write', async () => {
      nock('https://api.github.com')
        .get(
          '/repos/devopslibrary/sampledata/collaborators/testuser/permission',
        )
        .reply(200, nockGithubWriteUser);
      const testWrite = await service.userHasAccess(
        githubUser,
        Role.write,
        'devopslibrary',
        'sampledata',
      );
      expect(testWrite).toBe(true);
    });
    it('should disallow a write user permission to admin', async () => {
      nock('https://api.github.com')
        .get(
          '/repos/devopslibrary/sampledata/collaborators/testuser/permission',
        )
        .reply(200, nockGithubWriteUser);
      const testAdmin = await service.userHasAccess(
        githubUser,
        Role.admin,
        'devopslibrary',
        'sampledata',
      );
      expect(testAdmin).toBe(false);
    });
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
    nock('https://api.github.com')
      .get('/user/installations/1234567/repositories')
      .reply(403, nockGithubUserInstallationRepositoriesBlockedBySSO);
    it('should return all user repo installs if they have any', async () => {
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
      const installations = await service.getUserInstallations(githubUser);
      expect(installations[0]).toHaveProperty('account');
      expect(installations[0]).toHaveProperty('id');
      expect(installations.length).toBe(2);
    });
    it('should return an empty array for the user if they do not', async () => {
      nock('https://api.github.com')
        .get('/user/installations')
        .reply(200, nockGithubUserInstallationsEmpty);
      const installations = await service.getUserInstallations(githubUser);
      expect(installations.length).toBe(0);
      expect(installations).toEqual([]);
    });
  });

  afterAll(() => {
    nock.restore();
  });
});
