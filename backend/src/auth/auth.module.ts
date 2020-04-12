import { Module, HttpModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HttpStrategy } from './http.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [HttpModule, PassportModule],
  providers: [HttpStrategy, AuthService],
  controllers: [AuthController],
  exports: [HttpStrategy],
})
export class AuthModule {}
