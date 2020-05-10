import { Injectable, Logger } from '@nestjs/common';
import gitP, { SimpleGit } from 'simple-git/promise';
import fs from 'fs';
const fsPromises = fs.promises;

@Injectable()
export class GitService {
  private readonly logger = new Logger(GitService.name);

  async syncRepository(cloneURL, clonePath, token) {
    cloneURL = cloneURL.replace(
      'https://github.com/',
      `https://${token}@github.com/`,
    );

    // Is it already cloned?  If so we'll just pull
    await fsPromises.mkdir(clonePath, { recursive: true });
    const git: SimpleGit = gitP(clonePath);
    const isRepo = await git.checkIsRepo().then(result => {
      return result;
    });
    if (isRepo) {
      await git.removeRemote('origin');
      await git.addRemote('origin', cloneURL);
      await git.stash();
      await git.pull(cloneURL, 'master').then(() => {
        this.logger.log('Pulled latest for ' + clonePath);
      });
    } else {
      await git
        .silent(false)
        .clone(cloneURL, clonePath)
        .catch(err => this.logger.error('failed: ', err))
        .then(() => this.logger.log('Cloned ' + clonePath + ' successfully.'));
    }
  }
  async commitAndPushChanges(
    clonePath: string,
    commitMessage: string,
    branch: string,
  ) {
    const git: SimpleGit = gitP(clonePath);
    await git.add('*');
    await git.commit(commitMessage);
    await git.push('origin', branch);
  }

  async createBranch(clonePath: string, branchName: string) {
    const git: SimpleGit = gitP(clonePath);
    const branches = await git.checkoutBranch(branchName, 'master');
  }
}
