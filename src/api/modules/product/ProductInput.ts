import { IsNumber } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ProductInput {
  @Field()
  title: string;

  @Field()
  coverImage: string;

  @Field()
  rating: number;

  @Field()
  description: string;

  @Field()
  @IsNumber()
  price: number;

  @Field()
  offerPrice: number;

  @Field()
  categoryId: string;
}
