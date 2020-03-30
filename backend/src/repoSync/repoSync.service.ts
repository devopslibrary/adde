import { Injectable, Logger } from '@nestjs/common';
const fs = require('fs');
const git = require('simple-git/promise');

@Injectable()
export class RepoSyncService {
  private readonly logger = new Logger(RepoSyncService.name);

  // Clones/Pulls/Updates repository locally
  async sync(cloneURL: string, clonePath: string, token: string) {
    cloneURL = cloneURL
      .toLowerCase()
      .replace('https://github.com/', `https://${token}@github.com/`);

    // Clone, unless already pulled down, then update.
    if (!fs.existsSync(clonePath.toLowerCase())) {
      await git()
        .silent(false)
        .clone(cloneURL.toLowerCase(), clonePath.toLowerCase())
        .catch((err) => console.error('failed: ', err))
        .then(() => {
          this.logger.log(
            'Cloned ' + clonePath.toLowerCase() + ' successfully.',
          );
        });
    } else {
      await git(clonePath).removeRemote('origin');
      await git(clonePath).addRemote('origin', cloneURL.toLowerCase());
      await git(clonePath)
        .pull()
        .then(() => {
          this.logger.log('Pulled latest for ' + clonePath.toLowerCase());
        });
    }
  }
}
// .pull()
