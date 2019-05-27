import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { makeSlug } from '../utils/utils';
import { Category } from './Category';

@Entity('products')
@Unique(['slug'])
@Index(['isBanned'])
@ObjectType()
export class Product extends BaseEntity {
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

  @Field()
  @Column('double', { default: 0 })
  offerPrice: number;

  @Field()
  @Column('double', { default: 0 })
  price: number;

  @Field()
  @Column('double', { default: 0 })
  yourSavings: number;

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
  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @BeforeInsert()
  async slugify() {
    this.slug = makeSlug(this.title);
    this.yourSavings = this.offerPrice - this.price;
  }
}
