import { Module, HttpModule } from '@nestjs/common';
import { OrgsController } from './orgs.controller';

@Module({
  imports: [HttpModule],
  exports: [OrgsModule],
  controllers: [OrgsController],
})
export class OrgsModule {}
