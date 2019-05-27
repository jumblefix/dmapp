import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Product } from './Product';
import { User } from './User';

@Entity('cart')
@ObjectType()
export class Cart extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @ManyToOne(() => Product)
  product: Product;

  @Field()
  @ManyToOne(() => User)
  user: User;

  @Field()
  @Column('varchar', { length: 255 })
  title: string;

  @Field()
  @Column('int', { default: 1 })
  quantity: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
