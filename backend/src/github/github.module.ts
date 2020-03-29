import { Module, HttpModule } from '@nestjs/common';
import { GithubService } from './github.service';
import { ConfigModule } from '../config/config.module';

@Module({
  providers: [GithubService],
  imports: [HttpModule, ConfigModule],
})
export class GithubModule {}
