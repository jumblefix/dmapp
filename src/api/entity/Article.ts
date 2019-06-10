import { Ctx, Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { makeSlug } from '~utils/utils';
import { AppContext } from '../../types/types';
import { ArticleTag } from './ArticleTag';
import { Category } from './Category';
import { Tag } from './Tag';

@Entity('articles')
@Unique(['slug'])
@Index(['isBanned'])
@ObjectType()
export class Article extends BaseEntity {
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
  @Column('varchar', { length: 255, nullable: true })
  coverImage: string;

  @Field()
  @Column('text', { nullable: true })
  description: string;

  @Field()
  @Column('double', { default: 0 })
  rating: number;

  @Column({ default: false })
  isBanned: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @Field(() => Category)
  @ManyToOne(() => Category, category => category.articles)
  category: Category;

  @OneToMany(() => ArticleTag, ab => ab.tag)
  tag: Promise<ArticleTag[]>;

  @Field(() => [Tag], { nullable: true })
  async tags(@Ctx() { articleLoader }: AppContext): Promise<Tag[]> {
    return articleLoader.load(this.id);
  }

  @BeforeInsert()
  async slugify() {
    this.slug = makeSlug(this.title);
  }
}
