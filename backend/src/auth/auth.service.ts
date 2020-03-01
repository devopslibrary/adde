import { Injectable, ExecutionContext, HttpService } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService extends AuthGuard('jwt') {
  private _managementToken: string;

  constructor(
    private readonly _httpService: HttpService,
    private readonly _config: ConfigService,
  ) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    return super.canActivate(new ExecutionContextHost([req]));
  }

  async onModuleInit() {
    this._managementToken = await this._httpService
      .post('https://devopslibrary.auth0.com/oauth/token', {
        client_id: this._config.get('AUTH0_CLIENT_ID'),
        client_secret: this._config.get('AUTH0_CLIENT_SECRET'),
        grant_type: 'client_credentials',
        audience: `https://${this._config.get('AUTH0_DOMAIN')}/api/v2/`,
      })
      .pipe(map(response => response.data.access_token))
      .toPromise();
  }
}
