import { Global, Module } from '@nestjs/common';
import { HelperDateService } from './services/helper.date.service';

@Global()
@Module({
  providers: [HelperDateService],
  exports: [HelperDateService],
  controllers: [],
  imports: [],
})
export class HelperModule {}
