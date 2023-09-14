import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsEntity } from './posts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostsEntity])],
  // 处理http请求，包括路由控制，向客户端返回响应，将具体业务逻辑委托给providers处理；
  controllers: [PostsController],
  // Nest.js注入器实例化的提供者（服务提供者），处理具体的业务逻辑，各个模块之间可以共享
  providers: [PostsService],
})
export class PostsModule {}
