import { Controller, Get, UseGuards, HttpService } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GithubUser } from 'src/auth/githubUser.decorator';

@Controller('orgs')
export class OrgsController {
  constructor(private readonly _httpService: HttpService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async orgs(@GithubUser() githubUser: any) {
    const orgs = await this._httpService
      .get('https://api.github.com/user/orgs', {
        headers: { Authorization: `Bearer ${githubUser.access_token}` },
      })
      .toPromise();
    console.log(githubUser);
    console.log(orgs.data);
    return orgs.data;
    // return 'This action returns all cats';
  }
}
// const options = {
//   method: 'GET',
//   url: 'https://api.github.com/user/orgs',
//   headers: {
//     'content-type': 'application/json',
//     'authorization': 'token ' + githubToken,
//     'User-Agent': 'kondo.io',
//   },
// };
