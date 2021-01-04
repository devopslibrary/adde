import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { GithubService } from '../github/github.service';
import { GitService } from '../git/git.service';
import { GithubRepo } from 'src/github/githubRepo';
import { ConfigService } from '../config/config.service';

@Injectable()
export class BootstrapService implements OnApplicationBootstrap {
  constructor(
    private readonly githubService: GithubService,
    private readonly gitService: GitService,
    private readonly configService: ConfigService,
  ) {}
  async onApplicationBootstrap() {
    // Clone All Repositories
    const installations = await this.githubService.getAllInstallations();
    for (const installation of installations) {
      if (installation['suspended_at'] == null) {
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
          this.gitService.syncRepository(
            repo.clone_url,
            repoCache + '/' + repo.full_name.toLowerCase(),
            'x-access-token:' + cloneToken,
          );
        }
      } else {
        Logger.debug("Skipping suspended installation: " + installation.id)
      }
    }
  }
}
