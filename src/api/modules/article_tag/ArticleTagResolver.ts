import { Arg, Mutation, Resolver } from 'type-graphql';
import { ArticleTag } from '~api/entity/ArticleTag';

@Resolver(ArticleTag)
export class ArticleTagResolver {
  @Mutation(() => Boolean)
  async addArticleTag(
    @Arg('articleId') articleId: string,
    @Arg('tagId') tagId: string,
  ) {
    const articleTag = await ArticleTag.create({ articleId, tagId });
    articleTag.save();
    return true;
  }
}
