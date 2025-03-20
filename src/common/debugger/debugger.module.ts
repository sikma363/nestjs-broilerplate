import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigsType } from 'src/configs';
import winston, { LoggerOptions } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { DEBUGGER_NAME } from './constant/debugger.constant';

@Module({})
export class DebuggerModule {
  private readonly writeIntoFile: boolean;
  private readonly writeIntoConsole: boolean;
  private readonly maxSize: string;
  private readonly maxFiles: string;

  constructor(private configService: ConfigService<AllConfigsType>) {
    this.writeIntoFile = this.configService.get(
      'debugger.system.writeIntoFile',
      { infer: true },
    )!;
    this.writeIntoConsole = this.configService.get(
      'debugger.system.writeIntoConsole',
      {
        infer: true,
      },
    )!;
    this.maxSize = this.configService.get('debugger.system.maxSize', {
      infer: true,
    })!;
    this.maxFiles = this.configService.get('debugger.system.maxFiles', {
      infer: true,
    })!;
  }

  createLogger(): LoggerOptions {
    const transports: winston.transport[] = [];

    if (this.writeIntoFile) {
      transports.push(
        new DailyRotateFile({
          filename: `%DATE%.log`,
          dirname: `logs/${DEBUGGER_NAME}/error`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: this.maxSize,
          maxFiles: this.maxFiles,
          level: 'error',
        }),
      );
      transports.push(
        new DailyRotateFile({
          filename: `%DATE%.log`,
          dirname: `logs/${DEBUGGER_NAME}/default`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: this.maxSize,
          maxFiles: this.maxFiles,
          level: 'info',
        }),
      );
      transports.push(
        new DailyRotateFile({
          filename: `%DATE%.log`,
          dirname: `logs/${DEBUGGER_NAME}/debug`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: this.maxSize,
          maxFiles: this.maxFiles,
          level: 'debug',
        }),
      );
    }

    if (this.writeIntoConsole) {
      transports.push(new winston.transports.Console());
    }

    const loggerOptions: LoggerOptions = {
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
      ),
      transports,
    };

    return loggerOptions;
  }
}
