import { Module, HttpModule } from '@nestjs/common';
import { BootstrapService } from './bootstrap.service';
import { GithubModule } from '../github/github.module';
import { GithubService } from '../github/github.service';
import { RepoSyncModule } from '../repoSync/repoSync.module';
import { ConfigModule } from '../config/config.module';

@Module({
  providers: [BootstrapService, GithubService],
  imports: [GithubModule, RepoSyncModule, HttpModule, ConfigModule],
})
export class BootstrapModule {}
