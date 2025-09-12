import {
  Entity,
  Column,
  CreateDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class UserModel {
  // UUID 자동 생성 PK
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    // 데이터베이스에서 인지하는 컬럼 타입
    // 자동으로 유추됨
    type: 'varchar',
    // 데이터베이스 칼럼 이름
    // 프로퍼티 이름으로 자동 유추됨
    name: 'title',
    // 값의 길이
    // 입력 할 수 있는 글자의 길이가 300
    length: 300,
    // null이 가능한지
    nullable: true,
    // true면 처음 저장할때만 값 지정 가능
    // 이후에는 값 변경 불가능,
    update: true,
    // find()를 실행할때 기본으로 값을 불러올지
    // 기본값이 true
    // select false 시 title 이 기본으로 조회되지 않음
    // 옵션을 이렇게 하는경우 쿼리문에 selct: {title:true} 작성필요
    select: false,
    // 기본 값
    default: 'default value',
    // row 끼리 겹치면 안되는 설정 예 : 이메일
    unique: true,
  })
  title: string;

  // 데이터 생성 일자
  @CreateDateColumn()
  createdAt: Date;

  // 데이터 업데이트 일자
  @UpdateDateColumn()
  updatedAt: Date;

  // save()가 호출될 때마다 버전 증가
  @VersionColumn()
  version: number;

  // 추가 UUID (선택적)
  @Column()
  @Generated('uuid')
  additionalId: string;
}
