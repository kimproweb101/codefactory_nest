import { IsOptional, IsString } from 'class-validator';
import { CreaetePostDto } from './create-post.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePostDto extends PartialType(CreaetePostDto) {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
