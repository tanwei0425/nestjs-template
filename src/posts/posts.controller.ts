import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsRo } from './types';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  /**
   * 创建文章
   * @returns
   */
  @Post()
  async create(@Body() post) {
    return await this.postsService.create(post);
  }
  /**
   * 获取所有文章
   * @returns
   */
  @Get()
  async findAll(@Query() query): Promise<PostsRo> {
    return await this.postsService.findAll(query);
  }

  /**
   * 获取指定文章
   * @param id
   */
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.postsService.findById(id);
  }
  /**
   * 更新文章
   * @param id
   * @param post
   */
  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.postsService.updateById(id, post);
  }

  /**
   * 删除文章
   * @param id
   */
  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.postsService.remove(id);
  }

  /**
   * 测试
   * @returns
   */
  @Get('list')
  getPostsHello(): string {
    return this.postsService.getPostsHello();
  }
}
