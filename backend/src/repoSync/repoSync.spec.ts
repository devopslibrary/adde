import { RepoSyncService } from './repoSync.service';
const tmp = require('tmp');
const fs = require('fs');

describe('RepoSync Service', () => {
  let repoSync: RepoSyncService = new RepoSyncService();
  var tmpDirectory = tmp.dirSync();

  test('repoSync should clone successfully', async () => {
    await repoSync.sync(
      'https://github.com/devopslibrary/sampledata.git',
      tmpDirectory.name + '/sampledata',
      process.env.CLONE_TOKEN,
    );
    const files = await fs.readdirSync(tmpDirectory.name + '/sampledata');
    expect(files).toEqual(['.git', 'datacenters', 'servers']);
  });

  tmpDirectory.removeCallback();
});
