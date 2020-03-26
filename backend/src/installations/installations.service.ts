import { Injectable } from '@nestjs/common';
import { Repo } from '../repos/repos.entity';
const fs = require('fs');
const jwt = require('jsonwebtoken');

@Injectable()
export class InstallationsService {
  // Return all Github Installations for Adde, should return an array of IDs
  getInstallations(): Array<Number> {
    return [];
  }

  // Returns every repository that Adde has been added to.  Every single one
  // across all orgs.
  getAllInstallationRepos(): Array<Repo> {
    return [];
  }
}
