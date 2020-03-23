import { Controller, Get, UseGuards, HttpService, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GithubUser } from '../auth/githubUser.decorator';

@Controller('orgs')
export class OrgsController {
  constructor(private readonly _httpService: HttpService) {}

  // Return all orgs that a user is a member of
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async orgs(@GithubUser() githubUser: any) {
    const orgs = await this._httpService
      .get('https://api.github.com/user/orgs', {
        headers: { Authorization: `Bearer ${githubUser.access_token}` },
      })
      .toPromise();
    return orgs.data;
  }

  // Return all repositories for a given organization that a user has access to
  @Get(':org/repos')
  @UseGuards(AuthGuard('jwt'))
  async getRepos(@Param() params, @GithubUser() githubUser: any) {
    let repos = [];
    let currentPage = 1;
    let finished = false;
    while (!finished) {
      const repoAPI = await this._httpService
        .get(
          'https://api.github.com/orgs/' +
            params.org +
            '/repos?per_page=100&page=' +
            currentPage,
          {
            headers: { Authorization: `Bearer ${githubUser.access_token}` },
          },
        )
        .toPromise();
      repos = repos.concat(repoAPI.data);
      if (
        !repoAPI.headers.link ||
        !repoAPI.headers.link.includes('rel="next"')
      ) {
        finished = true;
      }
      currentPage = currentPage + 1;
    }
    return repos;
  }
}
