import { Module } from '@nestjs/common';
import { GitModule } from '../git/git.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [GitModule],
  providers: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {}
