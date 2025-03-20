import { registerAs } from '@nestjs/config';
import validateConfig from './validator';
import { IsBoolean, IsOptional } from 'class-validator';

class DebuggerConfigClass {
  @IsBoolean()
  @IsOptional()
  DEBUGGER_HTTP_WRITE_INTO_FILE: boolean;

  @IsBoolean()
  @IsOptional()
  DEBUGGER_HTTP_WRITE_INTO_CONSOLE: boolean;
}

interface IDebug {
  writeIntoFile: boolean;
  writeIntoConsole: boolean;
  maxFiles: number | string;
  maxSize: number | string;
}

export type DebuggerConfigType = {
  http: IDebug;
  system: IDebug;
};

export default registerAs<DebuggerConfigType>('debugger', () => {
  validateConfig(process.env, DebuggerConfigClass);

  return {
    http: {
      writeIntoFile: process.env.DEBUGGER_HTTP_WRITE_INTO_FILE === 'true',
      writeIntoConsole: process.env.DEBUGGER_HTTP_WRITE_INTO_CONSOLE === 'true',
      maxFiles: 5,
      maxSize: '2M',
    },
    system: {
      writeIntoFile: process.env.DEBUGGER_SYSTEM_WRITE_INTO_FILE === 'true',
      writeIntoConsole:
        process.env.DEBUGGER_SYSTEM_WRITE_INTO_CONSOLE === 'true',
      maxFiles: '7d',
      maxSize: '2m',
    },
  };
});
