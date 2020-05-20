import { Module } from '@nestjs/common';
import { RestApiController } from './restAPI.controller';
import { RestApiService } from './restAPI.service';
import { AuthModule } from '../auth/auth.module';
import { SchemaModule } from '../schema/schema.module';

@Module({
  controllers: [RestApiController],
  providers: [RestApiService],
  imports: [AuthModule, SchemaModule],
})
export class RestApiModule {}
