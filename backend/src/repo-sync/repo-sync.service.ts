import {Injectable, Logger} from '@nestjs/common';
import gitP, {SimpleGit} from 'simple-git/promise';
import fs from 'fs';

const fsPromises = fs.promises;
import simplegit = require('simple-git/promise');

@Injectable()
export class RepoSyncService {
  private readonly logger = new Logger(RepoSyncService.name);

  async syncRepository(cloneURL, clonePath, token) {
    cloneURL = cloneURL.replace(
      'https://github.com/',
      `https://${token}@github.com/`,
    );

    // Is it already cloned?  If so we'll just pull
    await fsPromises.mkdir(clonePath, {recursive: true});
    const git: SimpleGit = gitP(clonePath);
    const isRepo = await git.checkIsRepo().then((result) => {
      return result
    })
    if (isRepo) {
      await git.removeRemote('origin');
      await git.addRemote('origin', cloneURL);
      await git
        .pull()
        .then(() => {
          this.logger.log('Pulled latest for ' + clonePath);
        });
    } else {
      await git
        .silent(false)
        .clone(cloneURL, clonePath)
        .catch((err) => console.error('failed: ', err)).then(() => this.logger.log('Cloned ' + clonePath + ' successfully.'));
    }
  }
}
