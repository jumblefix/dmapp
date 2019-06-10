import * as DataLoader from 'dataloader';
import { In } from 'typeorm';
import { ArticleTag } from './entity/ArticleTag';
import { Tag } from './entity/Tag';

const batchArticles = async (tagIds: string[]) => {
  const articleTags = await ArticleTag.find({
    join: {
      alias: 'articleTag',
      innerJoinAndSelect: {
        article: 'articleTag.article',
      },
    },
    where: {
      tagId: In(tagIds),
    },
  });

  const tagIdToArticles: { [key: string]: Tag[] } = {};

  articleTags.forEach(x => {
    if (x.tagId in tagIdToArticles) {
      tagIdToArticles[x.tagId].push((x as any).__article__);
    } else {
      tagIdToArticles[x.tagId] = [(x as any).__article__];
    }
  });

  return tagIds.map(tagId => tagIdToArticles[tagId]);
};

export const createArticlesLoader = () => new DataLoader(batchArticles);
