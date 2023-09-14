import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { PostsEntity } from './posts/posts.entity';
import { PostsModule } from './posts/posts.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';

// 模块装饰器类
@Module({
  // 导入模块的列表，如果需要使用其他模块的服务，需要通过这里导入；
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局
      envFilePath: ['.env.dev'],
      load: [appConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql', // 数据库类型
          // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 动态匹配项目中所有的数据表实体
          autoLoadEntities: true, // 可以打开此配置项，表示<entities>配置自动引入，避免忘记
          host: configService.get('database.host', { infer: true }),
          database: configService.get('database.name', { infer: true }),
          port: configService.get<number>('database.port', { infer: true }),
          username: configService.get('database.username', { infer: true }),
          password: configService.get('database.password', { infer: true }),
          timezone: '+08:00', // 服务器上配置的时区
          // entityPrefix: '', // 数据库连接上的所有表（或集合）加的前缀
          synchronize: configService.get('database.synchronize', {
            infer: true,
          }),
          logging:
            configService.get('app.nodeEnv', { infer: true }) !== 'production', // 启用日志记录
          extra: {
            // max connection pool size
            max: configService.get('database.maxConnections', { infer: true }),
          },
        };
      },
    }),
    PostsModule,
  ],
  // 导出服务的列表，供其他模块导入使用。如果希望当前模块下的服务可以被其他模块共享，需要在这里配置导出；
  exports: [],
})
export class AppModule {}
