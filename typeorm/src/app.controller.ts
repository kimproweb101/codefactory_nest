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
import { ProfileModel } from './entity/profile.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
  ) {}

  @Post('users')
  postUsers(email: string) {
    const user = this.userRepository.create({
      email,
    });
    return this.userRepository.save(user);
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      relations: {
        profile: true,
      },
    });
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
    });
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'aaa@aaa.com',
    });

    const profile = await this.profileRepository.save({
      profileImg: 'aa.jpg',
      user,
    });
    return user;
  }
}
