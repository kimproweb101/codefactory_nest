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
import {
  ILike,
  LessThan,
  // Between,
  // Equal,
  // ILike,
  // In,
  // IsNull,
  // LessThan,
  // LessThanOrEqual,
  // Like,
  // MoreThanOrEqual,
  // Not,
  Repository,
} from 'typeorm';
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

  @Post('sample')
  async sample() {
    // 모델에 해당되는 객체 생성
    // const user1 = this.userRepository.create({
    //   email: 'test@codefactory.ai',
    // });
    // const user2 = await this.userRepository.save({
    //   email: 'test@codefactory.ai',
    // });
    // preload
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고
    // 추가 입력된 값으로 데이터베이스에서 가져온 값들을 대체함.
    // 저장하지는 않음
    // const user3 = await this.userRepository.preload({
    //   id: 101,
    //   email: 'codefactory@codefactory.ai',
    // });
    // 삭제하기
    // await this.userRepository.delete(101);
    // 값 증가 id가 1 인 row에 count 를 2씩 증가
    // await this.userRepository.increment(
    //   {
    //     id: 1,
    //   },
    //   'count',
    //   2,
    // );
    // 값 감소
    // await this.userRepository.decrement({ id: 1 }, 'count', 2);
    // return true;
    // 갯수 카운팅하기
    // const count = await this.userRepository.count({
    //   where: {
    //     email: ILike('%0%'),
    //   },
    // });
    // return count;
    // id가 4보다 작은 경우 합
    // const sum = await this.userRepository.sum('count', {
    //   id: LessThan(4),
    // });
    // return sum;
    // id가 4보다 작은 경우 평균
    // const average = await this.userRepository.average('count', {
    //   id: LessThan(4),
    // });
    // return average;
    // 최소값
    // const min = await this.userRepository.minimum('count', {
    //   id: LessThan(4),
    // });
    // return min;
    // 최소값
    // const max = await this.userRepository.maximum('count', {
    //   id: LessThan(4),
    // });
    // return max;
    // 검색
    // const users=await this.userRepository.find({
    // })
    // const userOne = await this.userRepository.findOne({
    //   where: {
    //     id: 3,
    //   },
    // });
    // return userOne;

    const usersAndCount = await this.userRepository.findAndCount({
      take: 3,
    });
    return usersAndCount;
  }

  @Post('users')
  async postUsers() {
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user-${i}@google.com`,
      });
    }
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      order: { id: 'ASC' },
      // where: {
      // [1] 아닌경우 가져오기
      // id: Not(1),
      // [2] 적은경우 가져오기
      // id: LessThan(30),
      // [3] 작거나 같거나
      // id: LessThanOrEqual(30),
      // [4] 크거나 같거나
      // id: MoreThanOrEqual(30),
      // [5] 같은경우
      // id: Equal(30),
      // [6] 유사값
      // email: Like('%0%'),
      // [7] 대소문자 구분 안하는 유사값
      // email: ILike('%GOOGLE%'),
      // 사이값
      // id: Between(10, 15),
      // 해당되는 여러개의 값
      // id: In([1, 3, 5, 7]),
      // null 경우
      // id: IsNull(),
      // },
      // 어떤 프로퍼티를 선택할지
      // 기본은 모든 프로퍼티를 가져온다
      // 만약에 select를 정의하지 않으면
      // select를 정의하면 정의된 프로퍼티를 가져온다
      // select: {
      //   id: true,
      //   email: true,
      //   createdAt: true,
      //   version: true,
      //   profile: {
      //     id: true,
      //   },
      // },
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
      // relations: {
      //   profile: true,
      // },
      // [5] relation table 컬럼 검색
      // where: {
      //   profile: {
      //     id: 3,
      //   },
      // },
      // [6] order
      // order: {
      //   id: 'DESC',
      // },
      // skip 처음 몇개를 제외할지
      // skip: 0,
      // take 몇개를 가져올지 [0 : all, 1 :1개, 2: 2개]
      // take: 1,
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
