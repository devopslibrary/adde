import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GithubUser } from '../auth/githubUser.decorator';
import { OrgsService } from './orgs.service';

@Controller('orgs')
export class OrgsController {
  constructor(private readonly orgsService: OrgsService) {}

  // Return all orgs that a user is a member of
  @Get()
  @UseGuards(AuthGuard('bearer'))
  orgs(@GithubUser() githubUser: any) {
    return this.orgsService.getUserOrgs(githubUser);
  }

  // Return all repositories for a given organization that a user has access to
  @Get(':org/repos')
  @UseGuards(AuthGuard('bearer'))
  async getRepos(@Param() params, @GithubUser() githubUser: any) {
    let org = params.org;
    return this.orgsService.getUserReposWithinOrg(org, githubUser);
  }

  // Get User installations
  @Get('/installations')
  @UseGuards(AuthGuard('bearer'))
  getUserInstallations(@GithubUser() githubUser: any) {
    return this.orgsService.getUserInstallations(githubUser);
  }
}
