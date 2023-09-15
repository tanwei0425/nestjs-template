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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './posts.dot';
@ApiTags('文章')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  /**
   * 创建文章
   * @returns
   */
  @ApiOperation({ summary: '创建文章' })
  @Post()
  async create(@Body() post: CreatePostDto) {
    return await this.postsService.create(post);
  }
  /**
   * 获取所有文章
   * @returns
   */
  @ApiOperation({ summary: '获取所有文章' })
  @Get()
  async findAll(@Query() query): Promise<PostsRo> {
    return await this.postsService.findAll(query);
  }

  /**
   * 获取指定文章
   * @param id
   */
  @ApiOperation({ summary: '获取指定文章' })
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.postsService.findById(id);
  }
  /**
   * 更新文章
   * @param id
   * @param post
   */
  @ApiOperation({ summary: '更新文章' })
  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.postsService.updateById(id, post);
  }

  /**
   * 删除文章
   * @param id
   */
  @ApiOperation({ summary: '删除文章' })
  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.postsService.remove(id);
  }

  /**
   * 测试
   * @returns
   */
  @ApiOperation({ summary: '接口测试' })
  @Get('list')
  getPostsHello(): string {
    return this.postsService.getPostsHello();
  }
}
