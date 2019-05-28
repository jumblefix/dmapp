import { MiddlewareFn } from 'type-graphql';
import { AppContext } from '~types/types';
import { errorMessages } from '~utils/common';
import { isAuthenticated, isAuthorized } from '~utils/utils';

export const checkIsAdmin: MiddlewareFn<AppContext> = async (
  { context },
  next,
) => {
  isAuthenticated(context);
  isAuthorized(context);
  return next();
};

export const checkIsAdminToRegister: MiddlewareFn<AppContext> = async (
  { context, args },
  next,
) => {
  const { isAdmin } = context.req.session as Express.Session;

  if (!isAdmin && args.data.isAdmin) {
    throw new Error(errorMessages.notAuthorizedToRegister);
  }

  return next();
};
