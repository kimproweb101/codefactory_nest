import { IsString } from 'class-validator';

export class CreaetePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
