import { Global, Module } from '@nestjs/common';
import { DebuggerModule } from './debugger/debugger.module';

@Global()
@Module({
  imports: [DebuggerModule],
})
export class CommonModule {}
