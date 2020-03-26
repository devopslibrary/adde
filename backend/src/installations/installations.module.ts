import { Module, HttpModule } from '@nestjs/common';
import { InstallationsService } from './installations.service';

@Module({
  providers: [InstallationsService],
  imports: [HttpModule],
})
export class InstallationsModule {}
