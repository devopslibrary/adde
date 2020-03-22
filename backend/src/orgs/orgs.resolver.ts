import { OrgsService } from './orgs.service';
import { Org } from './orgs.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from '@nestjs/common';
import { UserToken } from '../users/user.decorators';

@Resolver('Org')
export class OrgResolver {
  constructor(private readonly orgsService: OrgsService) {}

  // @UseGuards(AuthService)
  @Mutation((returns) => Org)
  async upsertOrg(@Args('org') org: Org) {
    return this.orgsService.upsertOrg(org);
  }

  /**
   * Returns all organizations that a user has access to.
   */
  // @UseGuards(AuthService)
  @Query((returns) => [Org])
  async findAllOrgs(@UserToken() token: any, @Request() req): Promise<Org[]> {
    return this.orgsService.findAllOrgs(token);
  }
}

// // Returns a Github Access_token!
// export async function getAuthToken(authToken, userId) {
//   const options = {
//     method: 'GET',
//     url: 'https://devopslibrary.auth0.com/api/v2/users/github|' + userId,
//     headers: {
//       'content-type': 'application/json',
//       'authorization': 'Bearer ' + authToken,
//     },
//   };
//   const result = await request(options, (error, response, body) => {
//     if (error) {
//       throw new Error(error);
//     }
//   });
//   return JSON.parse(result).identities[0].access_token;
// }
