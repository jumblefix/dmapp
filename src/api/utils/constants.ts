import { errorMessages } from '@utils/common';
import { createError } from 'apollo-errors';

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
