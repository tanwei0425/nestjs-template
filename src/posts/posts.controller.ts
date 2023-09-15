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
import { ApiOperation, ApiTags, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { CreatePostDto, getAllPostDto } from './posts.dot';
@ApiTags('文章')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  /**
   * 创建文章
   * @returns
   */
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token',
  })
  @ApiOperation({
    summary: '创建文章',
    description: '创建文章的api接口',
  })
  @ApiResponse({
    status: 200,
    description: '操作成功',
  })
  @Post()
  async create(@Body() post: CreatePostDto) {
    return await this.postsService.create(post);
  }
  /**
   * 获取所有文章
   * @returns
   */
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token',
  })
  @ApiOperation({
    summary: '获取所有文章',
    description: '获取所有文章的api接口',
  })
  @ApiResponse({
    status: 200,
    type: [getAllPostDto],
    description: '操作成功',
  })
  @Get()
  async findAll(@Query() query): Promise<PostsRo> {
    return await this.postsService.findAll(query);
  }

  /**
   * 获取指定文章
   * @param id
   */
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token',
  })
  @ApiOperation({
    summary: '获取指定文章',
    description: '获取指定文章的api接口',
  })
  @ApiResponse({
    status: 200,
    type: getAllPostDto,
    description: '操作成功',
  })
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.postsService.findById(id);
  }
  /**
   * 更新文章
   * @param id
   * @param post
   */
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token',
  })
  @ApiOperation({
    summary: '更新文章',
    description: '更新文章的api接口',
  })
  @ApiResponse({
    status: 200,
    description: '操作成功',
  })
  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.postsService.updateById(id, post);
  }

  /**
   * 删除文章
   * @param id
   */
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token',
  })
  @ApiOperation({
    summary: '删除文章',
    description: '删除文章的api接口',
  })
  @ApiResponse({
    status: 200,
    description: '操作成功',
  })
  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.postsService.remove(id);
  }

  /**
   * 测试
   * @returns
   */
  @ApiOperation({
    summary: '接口测试',
    description: '接口测试的api接口',
  })
  @ApiResponse({
    status: 200,
    description: '操作成功',
  })
  @Get('list')
  getPostsHello(): string {
    return this.postsService.getPostsHello();
  }
}
