import { graphql, GraphQLSchema } from 'graphql';
import Maybe from 'graphql/tsutils/Maybe';
import { createSchema } from './create-schema';

interface Options {
  source: string;
  vars?: Maybe<{
    [key: string]: any;
  }>;
  userId?: string;
  isAdmin?: boolean;
}

let schema: GraphQLSchema;

export const gqlCall = async ({
  source,
  vars = {},
  userId = '',
  isAdmin = false,
}: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  const result = await graphql({
    schema,
    source,
    variableValues: vars,
    contextValue: {
      req: {
        session: {
          userId,
          isAdmin,
          destroy: jest.fn(),
        },
      },
      res: {
        clearCookie: jest.fn(),
      },
    },
  });

  return {
    data: result.data,
    errors: result.errors,
  };
};
