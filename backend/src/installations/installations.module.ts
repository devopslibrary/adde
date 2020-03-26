import { Module } from '@nestjs/common';
import { InstallationsService } from './installations.service';

@Module({
  providers: [InstallationsService]
})
export class InstallationsModule {}
