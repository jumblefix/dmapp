import { Ctx, Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { AppContext } from '../../types/types';
import { makeSlug } from '../../utils/utils';
import { Article } from './Article';
import { ArticleTags } from './ArticleTags';

@Entity('tags')
@Unique(['slug'])
@ObjectType()
export class Tag extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('varchar', { length: 255 })
  title: string;

  @Field()
  @Column('varchar', { length: 255 })
  slug: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @OneToMany(() => ArticleTags, a => a.article)
  articleConnection: Promise<ArticleTags[]>;

  @Field(() => [Article])
  async articles(@Ctx() { articlesLoader }: AppContext): Promise<Article[]> {
    return articlesLoader.load(this.id);
  }

  @BeforeInsert()
  async slugify() {
    this.slug = makeSlug(this.title);
  }
}
