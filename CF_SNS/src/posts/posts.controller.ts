import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

const posts: PostModel[] = [
  {
    id: 1,
    author: 'author01',
    title: 'title01',
    content: 'content01',
    likeCount: 100,
    commentCount: 100,
  },
  {
    id: 2,
    author: 'author02',
    title: 'title02',
    content: 'content02',
    likeCount: 100,
    commentCount: 100,
  },
  {
    id: 3,
    author: 'author03',
    title: 'title03',
    content: 'content03',
    likeCount: 100,
    commentCount: 100,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  getPosts() {
    return posts;
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    const post = posts.find((post) => post.id === +id);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }
}
