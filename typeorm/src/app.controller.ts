import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserModel } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  @Post('users')
  postUsers(title: string) {
    const user = this.userRepository.create({
      title,
    });
    return this.userRepository.save({});
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find();
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    return this.userRepository.save({
      ...user,
      title: user?.title + '0',
    });
  }
}
