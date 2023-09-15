import { registerAs } from '@nestjs/config';
import { AppConfig } from './config.types';

// https://github.com/brocoders/nestjs-boilerplate/blob/main/src/config/config.type.ts
export default registerAs<AppConfig>('app', () => {
  return {
    appName: process.env.APP_NAME || 'NestJS API',
    version: '1.0.0',
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.APP_PORT
      ? parseInt(process.env.APP_PORT)
      : process.env.PORT
      ? parseInt(process.env.PORT)
      : 3000,
    apiPrefix: process.env.API_PREFIX || 'api',
  };
});
