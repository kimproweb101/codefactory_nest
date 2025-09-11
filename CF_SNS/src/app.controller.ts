import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

interface Post {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}
// [1] @Controller('post') @Get('post') 개념
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('post')
  getPost(): Post {
    return {
      author: 'newjeans_official',
      title: '뉴진스 민지',
      content: '메이크업 고치고 있는 민지',
      likeCount: 10000000,
      commentCount: 999999,
    };
  }
}
