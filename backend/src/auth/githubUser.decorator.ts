import { createParamDecorator } from '@nestjs/common';

export const GithubUser = createParamDecorator((data, req) => {
  return req.user.githubUser;
});
