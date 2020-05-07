import { Test, TestingModule } from '@nestjs/testing';
import { RepoSyncService } from './repo-sync.service';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';
import { promises as fs } from 'fs';
import tmp from 'tmp';

describe('RepoSyncService', () => {
  let repoSyncService: RepoSyncService;
  let configService: ConfigService;
  let clonePath: string;
  let cloneToken: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepoSyncService],
      imports: [ConfigModule],
    }).compile();
    repoSyncService = module.get<RepoSyncService>(RepoSyncService);
    configService = module.get<ConfigService>(ConfigService);
    clonePath = (await tmp.dirSync()).name; // Create fresh temp directory
    cloneToken = configService.get('CLONE_TOKEN');
  });

  describe('syncRepository', () => {
    it("should clone a repository successfully if it doesn't exist", async () => {
      await repoSyncService.syncRepository(
        'https://github.com/devopslibrary/sampledata.git',
        clonePath,
        cloneToken,
      );
      const directoryListing = await fs.readdir(clonePath);
      expect(directoryListing).toEqual([
        '.git',
        'applications',
        'datacenters',
        'servers',
      ]);
    });
    it('should pull updates for a repository successfully if it already exists', async () => {
      await repoSyncService.syncRepository(
        'https://github.com/devopslibrary/sampledata.git',
        clonePath,
        cloneToken,
      );
      await repoSyncService.syncRepository(
        'https://github.com/devopslibrary/sampledata.git',
        clonePath,
        cloneToken,
      );
      const directoryListing = await fs.readdir(clonePath);
      expect(directoryListing).toEqual([
        '.git',
        'applications',
        'datacenters',
        'servers',
      ]);
    });
  });
});
