// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import { ApolloServer } from 'apollo-server-express';
import * as connectRedis from 'connect-redis';
import * as cors from 'cors';
import * as express from 'express';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as http from 'http';
import { connectDb, createDb } from './db';
import { redis } from './redis';
import { AppContext } from './types/types';
import { Env } from './utils/constants';
import { createSchema } from './utils/create-schema';

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

  const server = new ApolloServer({
    schema: await createSchema(),
    context: ({ req, res }: AppContext) => ({ req, res }),
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
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    }),
  );

  app.get('/', (_, res) => res.json({ message: 'pong' }));

  server.applyMiddleware({ app, cors: false });

  const port = process.env.NODE_ENV === Env.test ? 4001 : 4000;
  const host = 'localhost';

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  const { graphqlPath, subscriptionsPath } = server;

  return httpServer.listen({ port }, async () => {
    console.log(`🚀 Server http://${host}:${port}${graphqlPath}`);
    console.log(`🚀 Subscription ws://${host}:${port}${subscriptionsPath}`);
  });
};
