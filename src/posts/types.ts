import { PostsEntity } from './posts.entity';
export interface PostsRo {
  list: PostsEntity[];
  count: number;
}
