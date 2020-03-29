import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { GithubService } from '../github/github.service';
import { RepoSyncService } from '../repoSync/repoSync.service';
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
      const installRepositories: Array<GithubRepo> = await installationReposRequest
        .data.repositories;

      for (const repo of installRepositories) {
        const cloneToken = await this.githubService.getGithubInstallationToken(
          installation.id,
        );
        const repoCache = this.configService.get('REPO_CACHE_DIRECTORY');
        this.repoSyncService.sync(
          repo.clone_url,
          repoCache + '/' + repo.full_name,
          'x-access-token:' + cloneToken.token,
        );
      }
      installRepositories.forEach((repo: GithubRepo) => {
        repo.clone_url;
      });
    }
  }
}
