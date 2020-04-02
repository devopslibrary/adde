import { Module } from '@nestjs/common';
import { RepoSyncService } from './repo-sync.service';

@Module({
  providers: [RepoSyncService],
  exports: [RepoSyncService]
})
export class RepoSyncModule {}
