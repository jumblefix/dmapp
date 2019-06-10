import { IsNumber } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ArticleInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  coverImage: string;

  @Field({ defaultValue: 0 })
  @IsNumber()
  rating: number;

  @Field()
  description: string;

  @Field()
  categoryId: string;

  @Field(() => [String], { defaultValue: [] })
  tagIds: string[];
}
