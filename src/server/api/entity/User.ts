import * as bcryptjs from 'bcryptjs';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('users')
@Unique(['email'])
@Index(['isBanned', 'username', 'confirmed', 'isAdmin'])
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('varchar', { length: 100 })
  name: string;

  @Field()
  @Column('varchar', { length: 255 })
  email: string;

  @Field({ nullable: true })
  @Column('varchar', { length: 30, nullable: true })
  username: string;

  @Field()
  @Column('varchar', { length: 20, nullable: true })
  mobile: string;

  @Column('text')
  password: string;

  @Field()
  @Column({ default: false })
  confirmed: boolean;

  @Column({ default: false })
  isBanned: boolean;

  @Column({ nullable: true })
  lastResetRequestTime: Date;

  @Field()
  @Column('varchar', { length: 255, nullable: true })
  profilePic: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcryptjs.hash(this.password, 10);
  }
}
