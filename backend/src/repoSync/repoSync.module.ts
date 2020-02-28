import { Module } from '@nestjs/common';
import { RepoSyncService } from './repoSync.service';

@Module({
  providers: [RepoSyncService],
  exports: [RepoSyncService],
})
export class RepoSyncModule {}
