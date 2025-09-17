import { IsString } from 'class-validator';

export class CreaetePostDto {
  @IsString({
    message: 'title은 string 타입을 입력 해야 합니다.',
  })
  title: string;

  @IsString({
    message: 'content string 타입을 입력 해야 합니다.',
  })
  content: string;
}
