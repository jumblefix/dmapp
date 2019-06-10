import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { makeSlug } from '~utils/utils';
import { Article } from './Article';

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

  @Field(() => [Article])
  @ManyToMany(() => Article, article => article.tag)
  @JoinTable()
  article: Article[];

  @BeforeInsert()
  async slugify() {
    this.slug = makeSlug(this.name);
  }
}
