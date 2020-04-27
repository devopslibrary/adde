import { Module } from '@nestjs/common';
import { RestApiController } from './restAPI.controller';
import { RestApiService } from './restAPI.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [RestApiController],
  providers: [RestApiService],
  imports: [AuthModule],
})
export class RestApiModule {}
