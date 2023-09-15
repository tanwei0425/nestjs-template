import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreatePostDto {
  @ApiProperty({ description: '标题' })
  readonly title: string;
  @ApiProperty({ description: '作者' })
  readonly author: string;
  @ApiProperty({ description: '内容' })
  readonly content: string;
  @ApiPropertyOptional({ description: '封面' })
  readonly thumb_url: string;
  @ApiProperty({ description: '类型' })
  readonly type: number;
}
export class getAllPostDto extends CreatePostDto {
  @ApiProperty({ description: 'id', default: 1 })
  readonly id: number;
  @ApiProperty({ description: '创建时间' })
  readonly create_time: string;
  @ApiProperty({ description: '更新时间' })
  readonly update_time: string;
}
