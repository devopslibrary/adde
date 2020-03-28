import { Injectable, HttpService } from '@nestjs/common';
import { Repo } from '../repos/repos.entity';
import { ConfigService } from '../config/config.service';
import { Installation } from './installation';
import { InstallationToken } from './installationToken';
const fs = require('fs');
const jwt = require('jsonwebtoken');

@Injectable()
export class InstallationsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly _httpService: HttpService,
  ) {}

  // Return all Github Installations for Adde, should return an array of IDs
  async getInstallations(): Promise<Array<Installation>> {
    const githubAppToken = this.getGitHubAppToken();
    const installations = await this._httpService
      .get('https://api.github.com/app/installations', {
        headers: {
          Authorization: `Bearer ${githubAppToken}`,
          Accept: 'application/vnd.github.machine-man-preview+json',
        },
      })
      .toPromise();
    return installations.data;
  }

  // Returns every repository that Adde has been added to.  Every single one
  // across all orgs.
  getAllInstallationRepos(): Array<Repo> {
    return [];
  }

  // Helper to authenticate as machine agent
  // Use private key to generate JWT to authenticate to Github
  // Max expiration is 10 min per Github.
  getGitHubAppToken(): String {
    const signOptions = {
      issuer: this.configService.get('GITHUB_CLIENT_ID'),
      expiresIn: '10m',
      algorithm: 'RS256',
    };
    const privateKey = fs.readFileSync('private-key.pem', 'utf8');
    const token = jwt.sign({}, privateKey, signOptions);

    return token;
  }

  async getGithubInstallationToken(installationId): Promise<InstallationToken> {
    const githubAppToken = this.getGitHubAppToken();
    const installationToken = await this._httpService
      .post(
        'https://api.github.com/app/installations/installationId/access_tokens',
        {},
        {
          headers: {
            Authorization: `Bearer ${githubAppToken}`,
            Accept: 'application/vnd.github.machine-man-preview+json',
          },
        },
      )
      .toPromise();

    return installationToken.data;
  }
}

// const githubUser = await this._httpService
//   .get(
//     'https://api.github.com/app/installations/' +
//       this.configService.get('GITHUB_INSTALLATION_ID') +
//       '/access_tokens',
//     {
//       headers: { Authorization: `Bearer ${this._managementToken}` },
//     },
//   )
//   .toPromise();
//     curl -i -X POST \
// -H "Authorization: Bearer YOUR_JWT" \
// -H "Accept: application/vnd.github.machine-man-preview+json" \
// https://api.github.com/app/installations/:installation_id/access_tokens

// require 'openssl'
// require 'jwt'  # https://rubygems.org/gems/jwt

// # Private key contents
// private_pem = File.read(YOUR_PATH_TO_PEM)
// private_key = OpenSSL::PKey::RSA.new(private_pem)

// # Generate the JWT
// payload = {
//   # issued at time
//   iat: Time.now.to_i,
//   # JWT expiration time (10 minute maximum)
//   exp: Time.now.to_i + (10 * 60),
//   # GitHub App's identifier
//   iss: YOUR_APP_ID
// }

// jwt = JWT.encode(payload, private_key, "RS256")
// puts jwt
