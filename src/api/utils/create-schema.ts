import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as Redis from 'ioredis';
import { buildSchema } from 'type-graphql';
import { CartResolver } from '../modules/cart/CartResolver';
import { CategoryResolver } from '../modules/category/CategoryResolver';
import { ProductResolver } from '../modules/product/ProductResolver';
import { LoginResolver } from '../modules/user/Login';
import { LogoutResolver } from '../modules/user/Logout';
import { RegisterResolver } from '../modules/user/Register';
import { UserAccountUtils } from '../modules/user/UserAccountUtils';
import { UserResolver } from '../modules/user/UserResolver';

export const createSchema = () => {
  const options: Redis.RedisOptions = {
    retryStrategy: times => Math.max(times * 100, 3000),
  };

  // create Redis-based pub-sub
  const pubSub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options),
  });

  return buildSchema({
    resolvers: [
      UserResolver,
      RegisterResolver,
      LoginResolver,
      LogoutResolver,
      UserAccountUtils,
      ProductResolver,
      CategoryResolver,
      CartResolver,
    ],
    pubSub,
  });
};
