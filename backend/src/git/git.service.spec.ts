import { Test, TestingModule } from '@nestjs/testing';
import { GitService } from './git.service';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';
import { promises as fs } from 'fs';
import tmp from 'tmp';
import gitP, { SimpleGit } from 'simple-git/promise';
const axios = require('axios');

describe('GitService', () => {
  let gitService: GitService;
  let configService: ConfigService;
  let clonePath: string;
  let cloneToken: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GitService],
      imports: [ConfigModule],
    }).compile();
    gitService = module.get<GitService>(GitService);
    configService = module.get<ConfigService>(ConfigService);
    cloneToken = configService.get('CLONE_TOKEN');
  });

  describe('syncRepository', () => {
    it('should clone a repository successfully if it does not exist', async () => {
      clonePath = (await tmp.dirSync()).name; // Create fresh temp directory
      await gitService.syncRepository(
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
      await gitService.syncRepository(
        'https://github.com/devopslibrary/sampledata.git',
        clonePath,
        cloneToken,
      );
      await gitService.syncRepository(
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
  describe('commitAndPushChanges', () => {
    it('should commit and push changes back to a repository', async () => {
      clonePath = (await tmp.dirSync()).name; // Create fresh temp directory
      await gitService.syncRepository(
        'https://github.com/devopslibrary/sampledata.git',
        clonePath,
        cloneToken,
      );
      await gitService.createBranch(clonePath, 'testBranch');
      await fs.writeFile(
        clonePath + '/testfile.txt',
        'Testing creation of branch',
      );
      await gitService.commitAndPushChanges(
        clonePath,
        'Testing a commit and push',
        'testBranch',
      );
      const didItPush = await axios.get(
        'https://raw.githubusercontent.com/devopslibrary/sampledata/testBranch/testfile.txt',
      );
      expect(didItPush.data).toEqual('Testing creation of branch');
      axios.defaults.validateStatus = () => true;
      await axios.delete(
        'https://api.github.com/repos/devopslibrary/sampledata/git/refs/heads/testBranch',
        {
          headers: {
            Authorization: `Bearer ${cloneToken}`,
          },
        },
      );
    });
  });
  describe('createBranch', () => {
    it('should create a new local branch and check it out', async () => {
      clonePath = (await tmp.dirSync()).name; // Create fresh temp directory
      await gitService.syncRepository(
        'https://github.com/devopslibrary/sampledata.git',
        clonePath,
        cloneToken,
      );
      await gitService.createBranch(clonePath, 'testing');
      const git: SimpleGit = gitP(clonePath);
      const branches = await git.branch();
      expect(branches.current).toBe('testing');
    });
  });
});
