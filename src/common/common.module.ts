import { Global, Module } from '@nestjs/common';
import { DebuggerModule } from './debugger/debugger.module';
import { HelperModule } from './helper/helper.module';

@Global()
@Module({
  imports: [DebuggerModule, HelperModule],
})
export class CommonModule {}
