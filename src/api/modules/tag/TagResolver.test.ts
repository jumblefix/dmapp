import { print } from 'graphql/language/printer';
import { Connection } from 'typeorm';
import { connectTestDb } from '~api/db';
import { gqlCall } from '../../../utils/test-utils';
import { addTagMutation } from '../../graphql-queries';

let conn: Connection;

beforeAll(async () => {
  conn = await connectTestDb();
});

afterAll(() => {
  conn.close();
});

describe('TagResolver', () => {
  describe('addTag', () => {
    it('add tag successfully', async () => {
      const response = await gqlCall({
        source: print(addTagMutation),
        vars: {
          name: 'tag1',
        },
      });

      expect(response).toMatchObject({
        data: {
          addTag: {
            name: 'tag1',
          },
        },
      });
    });
  });
});
