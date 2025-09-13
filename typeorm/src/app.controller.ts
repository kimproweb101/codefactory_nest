import {
  Controller,
  Delete,
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
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Post('users')
  postUsers(email: string) {
    const user = this.userRepository.create({
      email: '1234@gmail.com',
    });
    return this.userRepository.save(user);
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      // 어떤 프로퍼티를 선택할지
      // 기본은 모든 프로퍼티를 가져온다
      // 만약에 select를 정의하지 않으면
      // select를 정의하면 정의된 프로퍼티를 가져온다
      select: {
        id: true,
        email: true,
        createdAt: true,
        version: true,
        profile: {
          id: true,
        },
      },
      // 필터링할 조건을 입력
      // [1] and 검색
      // where: {
      //   version: 1,
      //   id: 3,
      // },
      // [2] or 검색
      // where: [{ id: 3 }, { version: 1 }],
      // [3] 관계를 가져오는법
      // [4] relation
      relations: {
        profile: true,
      },
      // [5] relation table 컬럼 검색
      // where: {
      //   profile: {
      //     id: 3,
      //   },
      // },
      // [6] order
      order: {
        id: 'DESC',
      },
      // skip 처음 몇개를 제외할지
      skip: 0,
      // take 몇개를 가져올지 [0 : all, 1 :1개, 2: 2개]
      take: 1,
    });
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: +id,
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
        id: +id,
      },
    });
    return this.userRepository.save({
      ...user,
      email: user?.email + '0',
    });
  }

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    return await this.profileRepository.delete(+id);
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'aaa@aaa.com',
      profile: {
        profileImg: 'asdf.jpg',
      },
    });
    return user;
  }

  @Post('user/post')
  async createUserAndPosts() {
    const user = await this.userRepository.save({
      email: 'postuser@codefactory.ai',
    });
    await this.postRepository.save({
      author: user,
      title: 'post 1',
    });
    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });
    return user;
  }

  @Post('posts/tags')
  async createPostsTag() {
    const post1 = await this.postRepository.save({
      title: 'NestJS Lecture',
    });

    const post2 = await this.postRepository.save({
      title: 'Programming Lecture',
    });

    const tag1 = await this.tagRepository.save({
      name: 'Javascript',
      posts: [post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'Typescript',
      posts: [post1],
    });

    const post3 = await this.postRepository.save({
      title: 'NextJS Lecture',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
