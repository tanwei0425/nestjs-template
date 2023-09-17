import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { AllConfigType } from './config/config.types';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AllConfigType>);
  const appName = configService.getOrThrow('app.appName', { infer: true });
  const appVersion = configService.getOrThrow('app.version', { infer: true });
  const appApiPrefix = configService.getOrThrow('app.apiPrefix', {
    infer: true,
  });
  const appPort = configService.getOrThrow('app.port', { infer: true });
  // 设置swagger文档
  const swaggerConfig = new DocumentBuilder()
    .setTitle(`${appName}管理后台`)
    .setDescription(`${appName}管理后台接口文档`)
    .setVersion(appVersion)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  // 设置全局路由前缀
  app.setGlobalPrefix(appApiPrefix, { exclude: ['/'] });
  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 注册全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 注册全局数据验证
  app.useGlobalPipes(new ValidationPipe());
  // 设置端口号
  await app.listen(appPort);
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

/**
 * nest-cli提供的创建命令还有很多， 比如
 * 1、创建过滤器：nest g filter core/filter/http-exception
 * 2、拦截器（nest g interceptor core/interceptor/transform
 * 3、中间件（ nest g middleware core/middleware/logger
 * ...
 */
