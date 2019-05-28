import { print } from 'graphql/language/printer';
import { Connection, getManager } from 'typeorm';
import { errorMessages } from '~utils/common';
import { connectTestDb } from '../../db';
import { User } from '../../entity/User';
import {
  addCategoryMutation,
  addCategoryWithParentMutation,
  getBreadCrumbPathQuery,
  getCategoryByIdQuery,
  getCategoryBySlugQuery,
  getChildCategoriesQuery,
  removeCategoryMutation,
} from '../../graphql-operations';
import { Category } from './../../entity/Category';
import { getMainCategoryQuery } from './../../graphql-operations';
import { gqlCall } from './../../utils/test-utils';

let conn: Connection;
let a1: Category;
let a12: Category;
let a112: Category;
let user: User;
beforeAll(async () => {
  conn = await connectTestDb();
  const manager = getManager();

  user = await User.create({
    name: 'test user',
    email: 'admin-user@gmail.com',
    password: 'secret-password',
    isAdmin: true,
  }).save();

  a1 = new Category();
  a1.name = 'a1';
  await manager.save(a1);

  const a11 = new Category();
  a11.name = 'a11';
  a11.parent = a1;
  await manager.save(a11);

  a12 = new Category();
  a12.name = 'a12';
  a12.parent = a1;
  await manager.save(a12);

  const a111 = new Category();
  a111.name = 'a111';
  a111.parent = a11;
  await manager.save(a111);

  a112 = new Category();
  a112.name = 'a112';
  a112.parent = a11;
  await manager.save(a112);
});

afterAll(async () => {
  await conn.close();
});

describe('CategoryResolver', () => {
  describe('getCategoryById', () => {
    it('should return category', async () => {
      const response = await gqlCall({
        source: print(getCategoryByIdQuery),
        variableValues: {
          id: a1.id.toString(),
        },
      });
      expect(response).toMatchObject({
        data: {
          getCategoryById: {
            id: a1.id.toString(),
            name: a1.name,
          },
        },
      });

      const res = await gqlCall({
        source: print(getCategoryByIdQuery),
        variableValues: {
          id: '',
        },
      });
      expect(res).toMatchObject({
        data: {
          getCategoryById: null,
        },
      });
    });
  });
  describe('addCategory', () => {
    it('should add category', async () => {
      const response = await gqlCall({
        source: print(addCategoryMutation),
        variableValues: {
          name: 'a2',
        },
        userId: user.id.toString(),
        isAdmin: user.isAdmin,
      });
      expect(response).toMatchObject({
        data: {
          addCategory: {
            name: 'a2',
          },
        },
      });

      const res = await gqlCall({
        source: print(addCategoryWithParentMutation),
        variableValues: {
          name: 'a3',
          parentId: '0',
        },
        userId: user.id.toString(),
        isAdmin: user.isAdmin,
      });
      expect(res).toMatchObject({
        errors: [{ message: errorMessages.invalidParentCategory }],
      });
      const res1 = await gqlCall({
        source: print(addCategoryWithParentMutation),
        variableValues: {
          name: 'a3',
          parentId: '0',
        },
        userId: user.id.toString(),
        isAdmin: false,
      });
      expect(res1).toMatchObject({
        errors: [{ message: errorMessages.notAuthorized }],
      });
    });
  });

  describe('removeCategory', () => {
    it('should remove category', async () => {
      const response = await gqlCall({
        source: print(removeCategoryMutation),
        variableValues: {
          id: a112.id.toString(),
        },
        userId: user.id.toString(),
        isAdmin: user.isAdmin,
      });
      expect(response).toMatchObject({
        data: {
          removeCategory: true,
        },
      });

      const res = await gqlCall({
        source: print(removeCategoryMutation),
        variableValues: {
          id: '0',
        },
        userId: user.id.toString(),
        isAdmin: user.isAdmin,
      });
      expect(res).toMatchObject({
        data: {
          removeCategory: false,
        },
      });
    });
  });

  describe('getMainCategory', () => {
    it('should return main category', async () => {
      const response: any = await gqlCall({
        source: print(getMainCategoryQuery),
      });
      const {
        data: { getMainCategory },
      } = response;

      expect(getMainCategory).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'a1',
          }),
        ]),
      );
    });
  });
  describe('getChildCategories', () => {
    it('should return main category', async () => {
      const response = await gqlCall({
        source: print(getChildCategoriesQuery),
        variableValues: {
          id: a1.id.toString(),
        },
      });

      expect(response).toMatchObject({
        data: {
          getChildCategories: {
            name: 'a1',
            children: [
              {
                name: 'a11',
              },
              {
                name: 'a12',
              },
            ],
          },
        },
      });
      const res = await gqlCall({
        source: print(getChildCategoriesQuery),
        variableValues: {
          id: '0',
        },
      });

      expect(res).toMatchObject({
        errors: [{ message: errorMessages.invalidCategory }],
      });
    });
  });
  describe('getBreadCrumbPath', () => {
    it('should return main category', async () => {
      const response = await gqlCall({
        source: print(getBreadCrumbPathQuery),
        variableValues: {
          id: a12.id.toString(),
        },
      });

      expect(response).toMatchObject({
        data: {
          getBreadCrumbPath: {
            name: 'a12',
            parent: {
              name: 'a1',
            },
          },
        },
      });
      const res = await gqlCall({
        source: print(getBreadCrumbPathQuery),
        variableValues: {
          id: '0',
        },
      });

      expect(res).toMatchObject({
        errors: [{ message: errorMessages.invalidCategory }],
      });
    });
  });
  describe('getCategoryBySlug', () => {
    it('should return category', async () => {
      const response = await gqlCall({
        source: print(getCategoryBySlugQuery),
        variableValues: {
          slug: 'a1',
        },
      });

      expect(response).toMatchObject({
        data: {
          getCategoryBySlug: {
            name: 'a1',
            slug: 'a1',
          },
        },
      });
      const res = await gqlCall({
        source: print(getCategoryBySlugQuery),
        variableValues: {
          slug: 'blah',
        },
      });

      expect(res).toMatchObject({
        errors: [{ message: errorMessages.invalidCategory }],
      });

      const res1 = await gqlCall({
        source: print(getCategoryBySlugQuery),
        variableValues: { slug: '' },
      });

      expect(res1).toMatchObject({
        errors: [{ message: errorMessages.invalidCategory }],
      });
    });
  });
});
