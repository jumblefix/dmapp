import { Arg, Mutation, Resolver } from 'type-graphql';
import { Article } from '~api/entity/Article';
import { Category } from '~api/entity/Category';
import { errorMessages } from '~utils/common';
import { ArticleInput } from './ArticleInput';

@Resolver()
export class AddArticle {
  @Mutation(() => Article)
  async addArticle(@Arg('data')
  {
    title,
    coverImage,
    rating,
    description,
    categoryId,
  }: ArticleInput): Promise<Article> {
    const category = await Category.findOne(categoryId);

    if (!category) {
      throw new Error(errorMessages.invalidCategory);
    }

    const c = Article.create({
      title,
      coverImage,
      rating,
      description,
      category,
    });

    return c.save();
  }
}
