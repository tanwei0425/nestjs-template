import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { AllConfigType } from './config/config.types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AllConfigType>);

  // 设置全局路由前缀
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );
  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 注册全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 设置d端口号
  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
bootstrap();

// nest g resource dirname
// nest-cli语法： nest g [文件类型] [文件名] [文件目录]
/**
 * 一、创建posts模块
 * 1、执行 nest g mo posts
 * 2、自动创建一个posts模块，默认创建和文件名一样的posts目录，在posts目录下创建一个posts.module.ts
 * 3、同时在根模块app.module.ts中引入PostsModule这个模块，也在@Model装饰器的inports中引入了PostsModule
 */

/**
 * 二、创建posts控制器
 * 1、执行 nest g co posts
 * 2、自动创建了一个posts控制器，命名为posts.controller.ts以及一个该控制器的单元测试文件
 * 3、文件posts.module.ts中会自动引入PostsController,并且在@Module装饰器的controllers中注入
 */

/**
 * 三、创建posts创建服务类
 * 1、执行  nest g service posts
 * 2、自动创建app.service.ts文件，命名为posts.service.ts以及一个该服务类的单元测试文件
 * 3、文件posts.module.ts中会自动引入PostsService,并且在@Module装饰器的providers中注入注入
 */

// nest-cli提供的创建命令还有很多， 比如创建过滤器、拦截器和中间件等
