import { print } from 'graphql/language/printer';
import { Connection } from 'typeorm';
import { connectTestDb } from '~api/db';
import { Category } from '~api/entity/Category';
import {
  addArticleMutation,
  getArticleQuery,
  getArticlesByCategoryQuery,
  listArticlesQuery,
} from '~api/graphql-queries';
import { errorMessages } from '~utils/common';
import { gqlCall } from '~utils/test-utils';

let conn: Connection;
let category: Category;
beforeAll(async () => {
  conn = await connectTestDb();
  category = await Category.create({ name: 'Category Name' }).save();
});

afterAll(async () => {
  await conn.close();
});

describe('ArticleResolver', () => {
  describe('listArticles', () => {
    it('should return list of articles', async () => {
      const response = await gqlCall({
        source: print(listArticlesQuery),
      });
      expect(response).toMatchObject({
        data: {
          listArticles: [],
        },
      });
      const res2 = await gqlCall({
        source: print(listArticlesQuery),
        vars: {
          page: 2,
        },
      });
      expect(res2).toMatchObject({
        data: {
          listArticles: [],
        },
      });
    });
  });

  describe('getArticle', () => {
    it('should return list of articles', async () => {
      const res = await gqlCall({
        source: print(getArticleQuery),
        vars: {
          id: '',
        },
      });
      expect(res).toMatchObject({
        data: {
          getArticle: null,
        },
      });
      const response = await gqlCall({
        source: print(getArticleQuery),
        vars: {
          id: '123',
        },
      });
      expect(response).toMatchObject({
        data: {
          getArticle: null,
        },
      });
    });
  });

  describe('getArticlesByCategory', () => {
    it('should return list of articles', async () => {
      const response = await gqlCall({
        source: print(getArticlesByCategoryQuery),
        vars: {
          categoryId: category.id.toString(),
        },
      });
      expect(response).toMatchObject({
        data: {
          getArticlesByCategory: [],
        },
      });

      const res = await gqlCall({
        source: print(getArticlesByCategoryQuery),
        vars: {
          categoryId: '0',
        },
      });
      expect(res).toMatchObject({
        errors: [{ message: errorMessages.invalidCategory }],
      });
      await Category.delete(category);
    });
  });

  describe('addArticle', () => {
    it('should add article', async () => {
      const article = {
        title: 'Article Name',
        coverImage: 'something',
        description:
          'description must be at least 140 characters description must be at' +
          'least 140 characters description must be at least 140 characters ' +
          'description must be at least 140 characters description must be at' +
          'least 140 characters',
        rating: 0,
        categoryId: category.id.toString(),
      };

      const invalid = await gqlCall({
        source: print(addArticleMutation),
        vars: {
          data: { ...article, title: '' },
        },
      });

      expect(invalid).toMatchObject({
        errors: [{ message: errorMessages.validationFailed }],
      });

      const response = await gqlCall({
        source: print(addArticleMutation),
        vars: {
          data: article,
        },
      });

      expect(response).toMatchObject({
        data: {
          addArticle: {
            title: article.title,
            category: {
              name: category.name,
            },
          },
        },
      });

      const invalidProd = { ...article, categoryId: '0' };

      const res = await gqlCall({
        source: print(addArticleMutation),
        vars: {
          data: invalidProd,
        },
      });

      expect(res).toMatchObject({
        data: null,
      });
      await Category.delete(category);
    });
  });
});
