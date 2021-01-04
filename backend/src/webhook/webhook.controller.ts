import { Controller, Post, Body } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Webhook } from './webhook.dto';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  webhook(@Body() data: Webhook): Promise<string> {
    return this.webhookService.webhook(data);
  }
}
