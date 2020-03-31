import { Injectable, Logger } from '@nestjs/common';
const fs = require('fs');
const git = require('simple-git/promise');
const mkdirp = require('mkdirp');

@Injectable()
export class RepoSyncService {
  private readonly logger = new Logger(RepoSyncService.name);

  // Clones/Pulls/Updates repository locally
  async sync(cloneURL: string, clonePath: string, token: string) {
    cloneURL = cloneURL.replace(
      'https://github.com/',
      `https://${token}@github.com/`,
    );

    // Make directory if it does not exist
    await mkdirp(clonePath).then(async () => {
      await git(clonePath)
        .checkIsRepo()
        .then((isRepo) => !isRepo && cloneRepo(git(clonePath)))
        .then(async () => {
          await git(clonePath).removeRemote('origin');
          await git(clonePath).addRemote('origin', cloneURL);
          await git(clonePath)
            .pull()
            .then(() => {
              this.logger.log('Pulled latest for ' + clonePath);
            });
        });

      function cloneRepo(git) {
        return git
          .silent(false)
          .clone(cloneURL, clonePath)
          .catch((err) => console.error('failed: ', err));
      }
    });
  }
}
