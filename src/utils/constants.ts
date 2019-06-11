import { createError } from 'apollo-errors';
import { errorMessages } from '~utils/common';

export enum Env {
  development = 'development',
  test = 'test',
  production = 'production',
}

export enum TokenTypes {
  confirm = 'confirm',
  reset = 'reset',
}

export const ITEMS_PER_PAGE = 20;

export const InputValidationError = createError('InputValidationError', {
  message: errorMessages.validationFailed,
});

export const isProd = process.env.NODE_ENV === Env.production;
export const isTest = process.env.NODE_ENV === Env.test;
export const maxAge = 1000 * 60 * 60 * 24 * 7 * 365; // 7 years
