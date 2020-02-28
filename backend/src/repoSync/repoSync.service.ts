import { Injectable, Logger } from '@nestjs/common';
const fs = require('fs');
const git = require('simple-git/promise');

@Injectable()
export class RepoSyncService {
  private readonly logger = new Logger(RepoSyncService.name);

  // Clones/Pulls/Updates repository locally
  async sync(cloneURL: string, clonePath: string, token: string) {
    cloneURL = cloneURL.replace(
      'https://github.com/',
      `https://${token}@github.com/`,
    );

    // Clone, unless already pulled down, then update.
    if (!fs.existsSync(clonePath)) {
      await git()
        .silent(false)
        .clone(cloneURL, clonePath)
        .catch(err => console.error('failed: ', err));
      this.logger.log('Cloned ' + clonePath + ' successfully.');
    } else {
      await git(clonePath).pull();
    }
  }
}
