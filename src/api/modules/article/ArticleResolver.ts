import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Article } from '~api/entity/Article';
import { Category } from '~api/entity/Category';
import { articleSchema, errorMessages } from '~utils/common';
import { ITEMS_PER_PAGE } from '~utils/constants';
import { skipPage, validateInputs } from '~utils/utils';
import { Tag } from '../../entity/Tag';
import { ArticleInput } from './ArticleInput';

@Resolver(Article)
export class ArticleResolver {
  @Query(() => [Article])
  async listArticles(
    @Arg('page', { defaultValue: 1 }) page: number,
  ): Promise<Article[]> {
    return Article.find({
      skip: skipPage(page),
      take: ITEMS_PER_PAGE,
      relations: ['category', 'tag'],
    });
  }

  @Query(() => Article, { nullable: true })
  async getArticle(@Arg('id') id: string): Promise<Article | undefined> {
    if (!id) {
      return;
    }
    return Article.findOne(id, { relations: ['category', 'tag'] });
  }

  @Query(() => [Article])
  async getArticlesByCategory(
    @Arg('categoryId') categoryId: string,
    @Arg('page', { defaultValue: 1 }) page: number,
  ): Promise<Article[]> {
    const category = await Category.findOne(categoryId);
    if (!category) {
      throw new Error(errorMessages.invalidCategory);
    }

    return Article.find({
      skip: skipPage(page),
      take: ITEMS_PER_PAGE,
      where: { category },
      relations: ['category', 'tag'],
    });
  }

  @Mutation(() => Article)
  async addArticle(@Arg('data')
  {
    title,
    coverImage,
    description,
    rating,
    categoryId,
    tagIds,
  }: ArticleInput): Promise<Article> {
    await validateInputs(articleSchema, {
      title,
      coverImage,
      description,
      rating,
    });

    const category = await Category.findOne(categoryId);

    if (!category) {
      throw new Error(errorMessages.invalidCategory);
    }

    let tags: Tag[] = [];

    if (tagIds.length) {
      tags = await Tag.findByIds(tagIds);
    }

    const c = Article.create({
      title,
      coverImage,
      rating,
      description,
      category,
      tag: tags,
    });

    return c.save();
  }
}
