import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import configs from './configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: configs,
    }),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
