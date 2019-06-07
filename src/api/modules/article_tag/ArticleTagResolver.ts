import { Arg, Mutation, Resolver } from 'type-graphql';
import { ArticleTags } from '../../entity/ArticleTags';

@Resolver(ArticleTags)
export class ArticleTagResolver {
  @Mutation(() => Boolean)
  async addArticleTag(
    @Arg('articleId', () => String) articleId: string,
    @Arg('tagId', () => String) tagId: string,
  ) {
    await ArticleTags.create({ articleId, tagId }).save();
    return true;
  }

  @Mutation(() => Boolean)
  async addMultipleArticleTag(
    @Arg('articleId', () => String) articleId: string,
    @Arg('tagIds', () => [String]) tagIds: string[],
  ) {
    const values = tagIds.map(tagId => ({ articleId, tagId }));

    await ArticleTags.createQueryBuilder()
      .insert()
      .values(values)
      .execute();
    return true;
  }
}
