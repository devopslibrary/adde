import { Module, MiddlewareConsumer } from '@nestjs/common';
import { WebhookController } from './webhook/webhook.controller';
import { WebhookService } from './webhook/webhook.service';
import { WebhookModule } from './webhook/webhook.module';
import { RepoSyncModule } from './repoSync/repoSync.module';
import { ConfigModule } from '@nestjs/config';
import { SwaggerModule } from './swagger/swagger.module';
import { RestApiModule } from './restAPI/restAPI.module';
import { RestApiController } from './restAPI/restAPI.controller';
import { RestApiService } from './restAPI/restAPI.service';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [
    WebhookModule,
    RepoSyncModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV + '.env',
    }),
    SwaggerModule,
    RestApiModule,
  ],
  controllers: [WebhookController, RestApiController],
  providers: [WebhookService, RestApiService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
