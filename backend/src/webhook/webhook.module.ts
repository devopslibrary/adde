import { Module } from '@nestjs/common';
import { RepoSyncModule } from '../repo-sync/repo-sync.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [RepoSyncModule],
  providers: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {}
