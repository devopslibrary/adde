import { Test, TestingModule } from '@nestjs/testing';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { Webhook } from './webhook.dto';
import { RepoSyncModule } from '../repo-sync/repo-sync.module';
import { ConfigModule } from '@nestjs/config';

describe('AppController', () => {
  let webhookController: WebhookController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WebhookController],
      providers: [WebhookService],
      imports: [
        RepoSyncModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: process.env.NODE_ENV + '.env',
        }),
      ],
    }).compile();

    webhookController = app.get<WebhookController>(WebhookController);
  });

  describe('webhook', () => {
    it('should process successfully!"', async () => {
      const sampleWebhook: Webhook = {
        event: 'push',
        payload: {
          ref: 'refs/heads/master',
          before: '043d2847e9ff061ffad6d91689efffad345887b4',
          after: 'f65d651a410ed6d71d077b7714fe01bbc3c56e4a',
          repository: {
            id: 230966019,
            node_id: 'MDEwOlJlcG9zaXRvcnkyMzA5NjYwMTk=',
            name: 'sampledata',
            full_name: 'devopslibrary/sampledata',
            private: false,
            owner: {
              name: 'devopslibrary',
              email: null,
              login: 'devopslibrary',
              id: 11233903,
              node_id: 'MDEyOk9yZ2FuaXphdGlvbjExMjMzOTAz',
              avatar_url:
                'https://avatars3.githubusercontent.com/u/11233903?v=4',
              gravatar_id: '',
              url: 'https://api.github.com/users/devopslibrary',
              html_url: 'https://github.com/devopslibrary',
              followers_url:
                'https://api.github.com/users/devopslibrary/followers',
              following_url:
                'https://api.github.com/users/devopslibrary/following{/other_user}',
              gists_url:
                'https://api.github.com/users/devopslibrary/gists{/gist_id}',
              starred_url:
                'https://api.github.com/users/devopslibrary/starred{/owner}{/repo}',
              subscriptions_url:
                'https://api.github.com/users/devopslibrary/subscriptions',
              organizations_url:
                'https://api.github.com/users/devopslibrary/orgs',
              repos_url: 'https://api.github.com/users/devopslibrary/repos',
              events_url:
                'https://api.github.com/users/devopslibrary/events{/privacy}',
              received_events_url:
                'https://api.github.com/users/devopslibrary/received_events',
              type: 'Organization',
              site_admin: false,
            },
            html_url: 'https://github.com/devopslibrary/sampledata',
            description: 'Sample Declarative Data API for ADDE demos',
            fork: false,
            url: 'https://github.com/devopslibrary/sampledata',
            forks_url:
              'https://api.github.com/repos/devopslibrary/sampledata/forks',
            keys_url:
              'https://api.github.com/repos/devopslibrary/sampledata/keys{/key_id}',
            collaborators_url:
              'https://api.github.com/repos/devopslibrary/sampledata/collaborators{/collaborator}',
            teams_url:
              'https://api.github.com/repos/devopslibrary/sampledata/teams',
            hooks_url:
              'https://api.github.com/repos/devopslibrary/sampledata/hooks',
            issue_events_url:
              'https://api.github.com/repos/devopslibrary/sampledata/issues/events{/number}',
            events_url:
              'https://api.github.com/repos/devopslibrary/sampledata/events',
            assignees_url:
              'https://api.github.com/repos/devopslibrary/sampledata/assignees{/user}',
            branches_url:
              'https://api.github.com/repos/devopslibrary/sampledata/branches{/branch}',
            tags_url:
              'https://api.github.com/repos/devopslibrary/sampledata/tags',
            blobs_url:
              'https://api.github.com/repos/devopslibrary/sampledata/git/blobs{/sha}',
            git_tags_url:
              'https://api.github.com/repos/devopslibrary/sampledata/git/tags{/sha}',
            git_refs_url:
              'https://api.github.com/repos/devopslibrary/sampledata/git/refs{/sha}',
            trees_url:
              'https://api.github.com/repos/devopslibrary/sampledata/git/trees{/sha}',
            statuses_url:
              'https://api.github.com/repos/devopslibrary/sampledata/statuses/{sha}',
            languages_url:
              'https://api.github.com/repos/devopslibrary/sampledata/languages',
            stargazers_url:
              'https://api.github.com/repos/devopslibrary/sampledata/stargazers',
            contributors_url:
              'https://api.github.com/repos/devopslibrary/sampledata/contributors',
            subscribers_url:
              'https://api.github.com/repos/devopslibrary/sampledata/subscribers',
            subscription_url:
              'https://api.github.com/repos/devopslibrary/sampledata/subscription',
            commits_url:
              'https://api.github.com/repos/devopslibrary/sampledata/commits{/sha}',
            git_commits_url:
              'https://api.github.com/repos/devopslibrary/sampledata/git/commits{/sha}',
            comments_url:
              'https://api.github.com/repos/devopslibrary/sampledata/comments{/number}',
            issue_comment_url:
              'https://api.github.com/repos/devopslibrary/sampledata/issues/comments{/number}',
            contents_url:
              'https://api.github.com/repos/devopslibrary/sampledata/contents/{+path}',
            compare_url:
              'https://api.github.com/repos/devopslibrary/sampledata/compare/{base}...{head}',
            merges_url:
              'https://api.github.com/repos/devopslibrary/sampledata/merges',
            archive_url:
              'https://api.github.com/repos/devopslibrary/sampledata/{archive_format}{/ref}',
            downloads_url:
              'https://api.github.com/repos/devopslibrary/sampledata/downloads',
            issues_url:
              'https://api.github.com/repos/devopslibrary/sampledata/issues{/number}',
            pulls_url:
              'https://api.github.com/repos/devopslibrary/sampledata/pulls{/number}',
            milestones_url:
              'https://api.github.com/repos/devopslibrary/sampledata/milestones{/number}',
            notifications_url:
              'https://api.github.com/repos/devopslibrary/sampledata/notifications{?since,all,participating}',
            labels_url:
              'https://api.github.com/repos/devopslibrary/sampledata/labels{/name}',
            releases_url:
              'https://api.github.com/repos/devopslibrary/sampledata/releases{/id}',
            deployments_url:
              'https://api.github.com/repos/devopslibrary/sampledata/deployments',
            created_at: 1577732700,
            updated_at: new Date('2020-01-20T04:01:18Z'),
            pushed_at: 1579494566,
            git_url: 'git://github.com/devopslibrary/sampledata.git',
            ssh_url: 'git@github.com:devopslibrary/sampledata.git',
            clone_url: 'https://github.com/devopslibrary/sampledata.git',
            svn_url: 'https://github.com/devopslibrary/sampledata',
            homepage: null,
            size: 2,
            stargazers_count: 0,
            watchers_count: 0,
            language: null,
            has_issues: true,
            has_projects: true,
            has_downloads: true,
            has_wiki: true,
            has_pages: false,
            forks_count: 0,
            mirror_url: null,
            archived: false,
            disabled: false,
            open_issues_count: 0,
            license: null,
            forks: 0,
            open_issues: 0,
            watchers: 0,
            default_branch: 'master',
            stargazers: 0,
            master_branch: 'master',
            organization: 'devopslibrary',
          },
          pusher: { name: 'kenerwin88', email: 'ken@devopslibrary.com' },
          organization: {
            login: 'devopslibrary',
            id: 11233903,
            node_id: 'MDEyOk9yZ2FuaXphdGlvbjExMjMzOTAz',
            url: 'https://api.github.com/orgs/devopslibrary',
            repos_url: 'https://api.github.com/orgs/devopslibrary/repos',
            events_url: 'https://api.github.com/orgs/devopslibrary/events',
            hooks_url: 'https://api.github.com/orgs/devopslibrary/hooks',
            issues_url: 'https://api.github.com/orgs/devopslibrary/issues',
            members_url:
              'https://api.github.com/orgs/devopslibrary/members{/member}',
            public_members_url:
              'https://api.github.com/orgs/devopslibrary/public_members{/member}',
            avatar_url: 'https://avatars3.githubusercontent.com/u/11233903?v=4',
            description: null,
          },
          sender: {
            login: 'kenerwin88',
            id: 5382669,
            node_id: 'MDQ6VXNlcjUzODI2Njk=',
            avatar_url: 'https://avatars1.githubusercontent.com/u/5382669?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/kenerwin88',
            html_url: 'https://github.com/kenerwin88',
            followers_url: 'https://api.github.com/users/kenerwin88/followers',
            following_url:
              'https://api.github.com/users/kenerwin88/following{/other_user}',
            gists_url:
              'https://api.github.com/users/kenerwin88/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/kenerwin88/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/kenerwin88/subscriptions',
            organizations_url: 'https://api.github.com/users/kenerwin88/orgs',
            repos_url: 'https://api.github.com/users/kenerwin88/repos',
            events_url:
              'https://api.github.com/users/kenerwin88/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/kenerwin88/received_events',
            type: 'User',
            site_admin: false,
          },
          created: false,
          deleted: false,
          forced: false,
          base_ref: null,
          compare:
            'https://github.com/devopslibrary/sampledata/compare/043d2847e9ff...f65d651a410e',
          commits: [
            {
              id: 'f65d651a410ed6d71d077b7714fe01bbc3c56e4a',
              tree_id: '59195a157ebeebfe17023c95e640cd8e401027c7',
              distinct: true,
              message: 'Update ind01pr.json',
              timestamp: new Date('2020-01-19T23:29:26-05:00'),
              url:
                'https://github.com/devopslibrary/sampledata/commit/f65d651a410ed6d71d077b7714fe01bbc3c56e4a',
              author: {
                name: 'Ken Erwin',
                email: 'ken@devopslibrary.com',
                username: 'kenerwin88',
              },
              committer: {
                name: 'GitHub',
                email: 'noreply@github.com',
                username: 'web-flow',
              },
              added: [],
              removed: [],
              modified: ['datacenters/ind01pr.json'],
            },
          ],
          head_commit: {
            id: 'f65d651a410ed6d71d077b7714fe01bbc3c56e4a',
            tree_id: '59195a157ebeebfe17023c95e640cd8e401027c7',
            distinct: true,
            message: 'Update ind01pr.json',
            timestamp: new Date('2020-01-19T23:29:26-05:00'),
            url:
              'https://github.com/devopslibrary/sampledata/commit/f65d651a410ed6d71d077b7714fe01bbc3c56e4a',
            author: {
              name: 'Ken Erwin',
              email: 'ken@devopslibrary.com',
              username: 'kenerwin88',
            },
            committer: {
              name: 'GitHub',
              email: 'noreply@github.com',
              username: 'web-flow',
            },
            added: [],
            removed: [],
            modified: ['datacenters/ind01pr.json'],
          },
        },
      };
      const webhookOutput = await webhookController.webhook(sampleWebhook);
      expect(webhookOutput).toBe(
        'https://github.com/devopslibrary/sampledata.git',
      );
    });
  });
});
