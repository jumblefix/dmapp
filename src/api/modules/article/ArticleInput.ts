import { IsNumber } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ArticleInput {
  @Field()
  title: string;

  @Field()
  coverImage: string;

  @Field()
  @IsNumber()
  rating: number;

  @Field()
  description: string;

  @Field()
  categoryId: string;
}
