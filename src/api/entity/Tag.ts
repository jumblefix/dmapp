import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { makeSlug } from '~utils/utils';
import { ArticleTag } from './ArticleTag';

@Entity('tags')
@Unique(['slug'])
@ObjectType()
export class Tag extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('varchar', { length: 255 })
  name: string;

  @Field()
  @Column('varchar', { length: 255 })
  slug: string;

  @OneToMany(() => ArticleTag, at => at.article)
  article: Promise<ArticleTag[]>;

  @BeforeInsert()
  async slugify() {
    this.slug = makeSlug(this.name);
  }
}
