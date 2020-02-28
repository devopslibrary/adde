import { Controller, Get, Param } from '@nestjs/common';
import { RestApiService } from './restAPI.service';

// devopslibrary.sampledata.adde.to/rest/datacenters
@Controller('/rest')
export class RestApiController {
  constructor(private readonly restApiService: RestApiService) {}

  // Wildcard, /rest/*
  @Get(':account/:repo*')
  rest(
    @Param('account') account: string,
    @Param('repo') repo: string,
    @Param() params,
  ) {
    return this.restApiService.getData(account, repo, params[0]);
  }

  // Root URL, /rest
  @Get()
  restRoot(@Param('account') account: string, @Param('repo') repo: string) {
    return this.restApiService.getData(account, repo, '');
  }
}
