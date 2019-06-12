import { print } from 'graphql/language/printer';
import { Connection } from 'typeorm';
import { connectTestDb } from '~api/db';
import { errorMessages } from '../../../utils/common';
import { gqlCall } from '../../../utils/test-utils';
import { Tag } from '../../entity/Tag';
import { addTagMutation, listTagsQuery } from '../../graphql-queries';

let conn: Connection;

beforeAll(async () => {
  conn = await connectTestDb();
});

afterAll(() => {
  conn.close();
});

const tagData = `tag-${Math.random()}`;

describe('TagResolver', () => {
  describe('addTag', () => {
    it('add tag successfully', async () => {
      const res = await gqlCall({
        source: print(addTagMutation),
        vars: {
          name: tagData,
        },
      });
      console.log(JSON.stringify(res));
      expect(res).toMatchObject({
        data: {
          addTag: {
            name: tagData,
          },
        },
      });

      const res1 = await gqlCall({
        source: print(addTagMutation),
        vars: {
          name: '',
        },
      });
      expect(res1).toMatchObject({
        errors: [{ message: errorMessages.invalidTag }],
      });
    });
  });
  describe('listTags', () => {
    beforeEach(() => {
      Tag.clear();
    });

    it('should list tags', async () => {
      const res = await gqlCall({
        source: print(listTagsQuery),
        vars: {
          page: 1,
        },
      });

      expect(res).toMatchObject({
        data: {
          listTags: [],
        },
      });
    });
  });
});
