import DataLoader from 'dataloader';
import { In } from 'typeorm';
import { Article } from './entity/Article';
import { ArticleTags } from './entity/ArticleTags';

const batchArticles = async (tagIds: number[]) => {
  const articleTags = await ArticleTags.find({
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

  const tagIdToArticles: { [key: number]: Article[] } = {};

  articleTags.forEach(ab => {
    if (ab.tagId in tagIdToArticles) {
      tagIdToArticles[ab.tagId].push((ab as any).__article__);
    } else {
      tagIdToArticles[ab.tagId] = [(ab as any).__article__];
    }
  });

  return tagIds.map(tagId => tagIdToArticles[tagId]);
};

export const createArticlesLoader = () => new DataLoader(batchArticles);
