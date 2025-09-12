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

  @Column('text')
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
