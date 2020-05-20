import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { AxiosResponse } from 'axios';
import { GithubInstallation } from './githubInstallation';
import { InstallationToken } from './installationToken';
import { GithubRepo } from './githubRepo';
const fs = require('fs');
const jwt = require('jsonwebtoken');

// GithubService is used to perform all the queries against Github, that way
// testing is easier and the only thing reaching out directly is this class.
@Injectable()
export class GithubService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  // Get request as a Github App
  public getAsApp(url): Promise<AxiosResponse> {
    const appToken = this.getGitHubAppToken();
    return this.httpService
      .get(url, {
        headers: {
          Authorization: `Bearer ${appToken}`,
          Accept: 'application/vnd.github.machine-man-preview+json',
        },
      })
      .toPromise()
      .then(request => {
        return request;
      });
  }

  // Post request as a Github App
  public postAsApp(url): Promise<AxiosResponse> {
    const appToken = this.getGitHubAppToken();
    return this.httpService
      .post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${appToken}`,
            Accept: 'application/vnd.github.machine-man-preview+json',
          },
        },
      )
      .toPromise()
      .then(request => {
        return request;
      });
  }

  // Get request as a specific Github installation
  public getAsInstallation(installation, url): Promise<AxiosResponse> {
    return this.getGithubInstallationToken(installation).then(
      installationToken => {
        return this.httpService
          .get(url, {
            headers: {
              Authorization: `token ${installationToken.token}`,
              Accept: 'application/vnd.github.machine-man-preview+json',
            },
          })
          .toPromise()
          .then(request => {
            return request;
          });
      },
    );
  }

  // Return all Github Installations
  public getAllInstallations(): Promise<Array<GithubInstallation>> {
    return this.getAsApp('https://api.github.com/app/installations').then(
      output => {
        return output.data;
      },
    );
  }

  // Get all Repos across all Installations
  public async getAllRepos(): Promise<Array<any>> {
    const repos = [];
    const installations = await this.getAllInstallations();
    for (const installation of installations) {
      const installationReposRequest = await this.getAsInstallation(
        installation.id,
        'https://api.github.com/installation/repositories',
      );
      const installRepositories: Array<
        GithubRepo
      > = await installationReposRequest.data.repositories;

      installRepositories.forEach(repo => {
        repos.push(repo);
      });
    }
    return repos;
  }

  // Use private key to generate JWT to authenticate to Github
  private getGitHubAppToken(): string {
    const signOptions = {
      issuer: this.configService.get('GITHUB_APP_ID'),
      expiresIn: '10m',
      algorithm: 'RS256',
    };
    const privateKey = fs.readFileSync('private-key.pem', 'utf8');
    const token = jwt.sign({}, privateKey, signOptions);
    return token;
  }

  // Get Installation Token for specific installation
  public getGithubInstallationToken(installation): Promise<InstallationToken> {
    const githubAppToken = this.getGitHubAppToken();
    return this.httpService
      .post(
        'https://api.github.com/app/installations/' +
          installation +
          '/access_tokens',
        {},
        {
          headers: {
            Authorization: `Bearer ${githubAppToken}`,
            Accept: 'application/vnd.github.machine-man-preview+json',
          },
        },
      )
      .toPromise()
      .then(request => {
        return request.data;
      });
  }
}
