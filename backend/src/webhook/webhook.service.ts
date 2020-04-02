import { Injectable } from '@nestjs/common';
import { Webhook } from './webhook.dto';
import { RepoSyncService } from '../repo-sync/repo-sync.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WebhookService {
  constructor(
    private readonly repoSyncService: RepoSyncService,
    private readonly configService: ConfigService,
  ) {}

  async webhook(data: Webhook): Promise<string> {
    const cloneURL = data.payload.repository.clone_url;
    const repoCache = this.configService.get('REPO_CACHE_DIRECTORY');
    const repoNameWithOrg = data.payload.repository.full_name;
    const cloneToken = this.configService.get('CLONE_TOKEN');

    await this.repoSyncService.syncRepository(
      cloneURL,
      repoCache + '/' + repoNameWithOrg,
      cloneToken,
    );
    return cloneURL;
  }
}
