import { errorMessages } from '@utils/common';
import { UserInputError, ValidationError } from 'apollo-server-core';
import * as IORedis from 'ioredis';
import slugify from 'slugify';
import { v4 } from 'uuid';
import { AppContext } from '../types/types';
import { ITEMS_PER_PAGE, TokenTypes } from './constants';

export const printMessage = (str: string) => `Hello ${str}`;

export const makeSlug = (str: string) => slugify(str, { lower: true });

export const createTokenLink = async (
  url: string,
  userId: string,
  redis: IORedis.Redis,
  type: TokenTypes,
) => {
  const id = v4();
  await redis.set(id, userId, 'ex', 60 * 60 * 24);
  return `${url}/${type}/${id}`;
};

export function skipPage(page: number) {
  return (page - 1) * ITEMS_PER_PAGE;
}

export const formatYupError = (err: ValidationError) => {
  const errors: [{ path: string; message: string }] = [] as any;
  err.inner.forEach((e: any) => {
    errors.push({
      path: e.path,
      message: e.message,
    });
  });
  return errors;
};

export const validateInputs = async (schema: any, inputs: any) => {
  try {
    await schema.validate(inputs, { abortEarly: false });
  } catch (err) {
    const errors = formatYupError(err);
    throw new UserInputError(errorMessages.validationFailed, { errors });
  }
};

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const isAuthenticated = (ctx: AppContext): boolean => {
  const userId = ctx.req.session!.userId;
  if (!userId) {
    throw new Error(errorMessages.loginToContinue);
  }
  return true;
};

export const isAuthorized = (ctx: AppContext): boolean => {
  const isAdmin = ctx.req.session!.isAdmin;
  if (!isAdmin) {
    throw new Error(errorMessages.notAuthorized);
  }
  return true;
};
