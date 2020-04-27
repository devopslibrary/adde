import { Module, MiddlewareConsumer, HttpModule } from '@nestjs/common';
import { WebhookController } from './webhook/webhook.controller';
import { WebhookService } from './webhook/webhook.service';
import { WebhookModule } from './webhook/webhook.module';
import { ConfigModule } from '@nestjs/config';
import { SwaggerModule } from './swagger/swagger.module';
import { RestApiModule } from './restAPI/restAPI.module';
import { RestApiController } from './restAPI/restAPI.controller';
import { RestApiService } from './restAPI/restAPI.service';
import { LoggerMiddleware } from './logger.middleware';
import { OrgsController } from './orgs/orgs.controller';
import { AuthModule } from './auth/auth.module';
import { GithubModule } from './github/github.module';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { OrgsService } from './orgs/orgs.service';
import { RepoSyncModule } from './repo-sync/repo-sync.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';

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
    AuthModule,
    HttpModule,
    GithubModule,
    BootstrapModule,
    TerminusModule,
  ],
  controllers: [
    WebhookController,
    RestApiController,
    OrgsController,
    HealthController,
  ],
  providers: [WebhookService, RestApiService, OrgsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
