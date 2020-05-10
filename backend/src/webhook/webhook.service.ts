import { Injectable } from '@nestjs/common';
import { Webhook } from './webhook.dto';
import { GitService } from '../git/git.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WebhookService {
  constructor(
    private readonly gitService: GitService,
    private readonly configService: ConfigService,
  ) {}

  async webhook(data: Webhook): Promise<string> {
    const cloneURL = data.payload.repository.clone_url;
    const repoCache = this.configService.get('REPO_CACHE_DIRECTORY');
    const repoNameWithOrg = data.payload.repository.full_name;
    const cloneToken = this.configService.get('CLONE_TOKEN');

    await this.gitService.syncRepository(
      cloneURL,
      repoCache + '/' + repoNameWithOrg,
      cloneToken,
    );
    return cloneURL;
  }
}
