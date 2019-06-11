// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import http from 'http';
import { AppContext } from '~types/types';
import { Env, isProd, isTest, maxAge } from '~utils/constants';
import { createSchema } from '~utils/create-schema';
import { formatError } from '../utils/utils';
import { connectDb, createDb } from './db';
import { redis } from './redis';

export const startServer = async () => {
  try {
    await createDb();
  } catch (error) {
    throw new Error(error);
  }

  if (process.env.NODE_ENV !== Env.test) {
    await connectDb();
  }

  const app = express();

  const playgroundSettings: any = !isProd
    ? {
        settings: {
          'request.credentials': 'include',
        },
      }
    : false;

  const server = new ApolloServer({
    schema: await createSchema(),
    context: ({ req, res }: AppContext) => ({ req, res }),
    tracing: !isProd,
    debug: !isProd,
    playground: playgroundSettings,
    formatError,
  });

  const RedisStore = connectRedis(session);

  app.use(helmet());

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
    }),
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: 'qid',
      secret: 'superSecret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: isProd,
        maxAge,
      },
    }),
  );

  app.get('/', (_, res) => res.json({ message: 'pong' }));

  server.applyMiddleware({ app, cors: false });

  const port = isTest ? 4001 : 4000;
  const host = 'localhost';

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  const { graphqlPath, subscriptionsPath } = server;

  return httpServer.listen({ port }, async () => {
    console.log(`🚀 Server http://${host}:${port}${graphqlPath}`);
    console.log(`🚀 Subscription ws://${host}:${port}${subscriptionsPath}`);
  });
};
