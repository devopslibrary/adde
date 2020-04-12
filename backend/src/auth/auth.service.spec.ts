import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthModule } from './auth.module';
import { ConfigModule } from '../config/config.module';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { HttpService } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpService: HttpService;
  let config: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, ConfigModule],
    }).compile();
    service = module.get<AuthService>(AuthService);
    httpService = module.get<HttpService>(HttpService);
    config = module.get<ConfigService>(ConfigService);
  });

  // validateUser
  describe('validateUser', () => {
    it('should return user information if user exists', async () => {
      const token = config.get('CLONE_TOKEN');
      const user = await service.validateUser(token);
      expect(user).toHaveProperty('avatar_url');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('login');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('token');
    });
  });
  // getUserInstallations
  describe('getUserInstallations', () => {
    it('should return an array of installations for the user if they have any', async () => {
      const response: AxiosResponse<any> = {
        data: {
          installations: [
            {
              access_tokens_url:
                'https://api.github.com/app/installations/7957199/access_tokens',
              account: {
                avatar_url:
                  'https://avatars3.githubusercontent.com/u/11233903?v=4',
                events_url:
                  'https://api.github.com/users/devopslibrary/events{/privacy}',
                followers_url:
                  'https://api.github.com/users/devopslibrary/followers',
                following_url:
                  'https://api.github.com/users/devopslibrary/following{/other_user}',
                gists_url:
                  'https://api.github.com/users/devopslibrary/gists{/gist_id}',
                gravatar_id: '',
                html_url: 'https://github.com/devopslibrary',
                id: 11233903,
                login: 'devopslibrary',
                node_id: 'MDEyOk9yZ2FuaXphdGlvbjExMjMzOTAz',
                organizations_url:
                  'https://api.github.com/users/devopslibrary/orgs',
                received_events_url:
                  'https://api.github.com/users/devopslibrary/received_events',
                repos_url: 'https://api.github.com/users/devopslibrary/repos',
                site_admin: false,
                starred_url:
                  'https://api.github.com/users/devopslibrary/starred{/owner}{/repo}',
                subscriptions_url:
                  'https://api.github.com/users/devopslibrary/subscriptions',
                type: 'Organization',
                url: 'https://api.github.com/users/devopslibrary',
              },
              app_id: 58259,
              app_slug: 'adde-to',
              created_at: '2020-04-12T11:28:33.000-04:00',
              events: [
                'check_run',
                'check_suite',
                'commit_comment',
                'create',
                'delete',
                'fork',
                'gollum',
                'issues',
                'issue_comment',
                'label',
                'member',
                'milestone',
                'public',
                'pull_request',
                'pull_request_review',
                'pull_request_review_comment',
                'push',
                'release',
                'repository',
                'repository_dispatch',
                'star',
                'status',
                'watch',
              ],
              html_url:
                'https://github.com/organizations/devopslibrary/settings/installations/7957199',
              id: 7957199,
              permissions: {
                actions: 'write',
                administration: 'write',
                checks: 'write',
                contents: 'write',
                issues: 'write',
                members: 'read',
                metadata: 'read',
                organization_administration: 'read',
                pull_requests: 'write',
                repository_hooks: 'write',
                statuses: 'write',
              },
              repositories_url:
                'https://api.github.com/installation/repositories',
              repository_selection: 'selected',
              single_file_name: null,
              target_id: 11233903,
              target_type: 'Organization',
              updated_at: '2020-04-12T11:28:34.000-04:00',
            },
            {
              access_tokens_url:
                'https://api.github.com/app/installations/7549156/access_tokens',
              account: {
                avatar_url:
                  'https://avatars1.githubusercontent.com/u/39594840?v=4',
                events_url:
                  'https://api.github.com/users/KAR-AUTO/events{/privacy}',
                followers_url:
                  'https://api.github.com/users/KAR-AUTO/followers',
                following_url:
                  'https://api.github.com/users/KAR-AUTO/following{/other_user}',
                gists_url:
                  'https://api.github.com/users/KAR-AUTO/gists{/gist_id}',
                gravatar_id: '',
                html_url: 'https://github.com/KAR-AUTO',
                id: 39594840,
                login: 'KAR-AUTO',
                node_id: 'MDEyOk9yZ2FuaXphdGlvbjM5NTk0ODQw',
                organizations_url: 'https://api.github.com/users/KAR-AUTO/orgs',
                received_events_url:
                  'https://api.github.com/users/KAR-AUTO/received_events',
                repos_url: 'https://api.github.com/users/KAR-AUTO/repos',
                site_admin: false,
                starred_url:
                  'https://api.github.com/users/KAR-AUTO/starred{/owner}{/repo}',
                subscriptions_url:
                  'https://api.github.com/users/KAR-AUTO/subscriptions',
                type: 'Organization',
                url: 'https://api.github.com/users/KAR-AUTO',
              },
              app_id: 58259,
              app_slug: 'adde-to',
              created_at: '2020-03-25T21:02:43.000-04:00',
              events: [
                'check_run',
                'check_suite',
                'commit_comment',
                'create',
                'delete',
                'fork',
                'gollum',
                'issues',
                'issue_comment',
                'label',
                'member',
                'milestone',
                'public',
                'pull_request',
                'pull_request_review',
                'pull_request_review_comment',
                'push',
                'release',
                'repository',
                'repository_dispatch',
                'star',
                'status',
                'watch',
              ],
              html_url:
                'https://github.com/organizations/KAR-AUTO/settings/installations/7549156',
              id: 7549156,
              permissions: {
                actions: 'write',
                administration: 'write',
                checks: 'write',
                contents: 'write',
                issues: 'write',
                members: 'read',
                metadata: 'read',
                organization_administration: 'read',
                pull_requests: 'write',
                repository_hooks: 'write',
                statuses: 'write',
              },
              repositories_url:
                'https://api.github.com/installation/repositories',
              repository_selection: 'selected',
              single_file_name: null,
              target_id: 39594840,
              target_type: 'Organization',
              updated_at: '2020-04-07T00:15:07.000-04:00',
            },
          ],
          total_count: 2,
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };
      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));
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
      expect(installations.length).toBe(2);
    });
    it('should return an empty array for the user if they do not', async () => {
      const response: AxiosResponse<any> = {
        data: {
          total_count: 0,
          installations: [],
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };
      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));
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
