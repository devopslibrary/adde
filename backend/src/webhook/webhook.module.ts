import { Module } from '@nestjs/common';
import { RepoSyncModule } from '../repoSync/repoSync.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [RepoSyncModule],
  providers: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {}
