import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { GithubService } from '../github/github.service';
import { RepoSyncService } from '../repo-sync/repo-sync.service';
import { GithubRepo } from 'src/github/githubRepo';
import { ConfigService } from '../config/config.service';

@Injectable()
export class BootstrapService implements OnApplicationBootstrap {
  constructor(
    private readonly githubService: GithubService,
    private readonly repoSyncService: RepoSyncService,
    private readonly configService: ConfigService,
  ) {}
  async onApplicationBootstrap() {
    // Clone All Repositories
    const installations = await this.githubService.getAllInstallations();
    for (const installation of installations) {
      const installationReposRequest = await this.githubService.getAsInstallation(
        installation.id,
        'https://api.github.com/installation/repositories',
      );
      const installRepositories: GithubRepo[] = await installationReposRequest
        .data.repositories;

      for (const repo of installRepositories) {
        const cloneToken = await this.githubService.getGithubInstallationToken(
          installation.id,
        );
        const repoCache = this.configService.get('REPO_CACHE_DIRECTORY');
        this.repoSyncService.syncRepository(
          repo.clone_url,
          repoCache + '/' + repo.full_name.toLowerCase(),
          'x-access-token:' + cloneToken.token,
        );
      }
    }
  }
}
