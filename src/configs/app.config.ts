import { registerAs } from '@nestjs/config';
import validateConfig from './validator';
import {
  IsEnum,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsUrl,
  IsString,
} from 'class-validator';

enum Env {
  production = 'production',
  development = 'development',
  test = 'test',
}

class AppConfigClass {
  @IsEnum(Env)
  @IsOptional()
  NODE_ENV: Env;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number;

  @IsUrl({ require_tld: false })
  @IsOptional()
  FRONTEND_DOMAIN: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  BACKEND_DOMAIN: string;

  @IsString()
  @IsOptional()
  API_PREFIX: string;
}

export type AppConfigType = {
  nodeEnv: string;
  name: string;
  workingDirectory: string;
  frontendDomain?: string;
  backendDomain: string;
  port: number;
  apiPrefix: string;
};

export default registerAs<AppConfigType>('app', () => {
  validateConfig(process.env, AppConfigClass);

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    name: process.env.APP_NAME || 'app',
    workingDirectory: process.env.PWD || process.cwd(),
    frontendDomain: process.env.FRONTEND_DOMAIN,
    backendDomain: process.env.BACKEND_DOMAIN ?? 'http://localhost',
    port: process.env.APP_PORT
      ? parseInt(process.env.APP_PORT, 10)
      : process.env.PORT
        ? parseInt(process.env.PORT, 10)
        : 3000,
    apiPrefix: process.env.API_PREFIX || 'api',
  };
});
