import { print } from 'graphql/language/printer';
import { Connection } from 'typeorm';
import { connectTestDb } from '~api/db';
import { User } from '~api/entity/User';
import {
  changeEmailMutation,
  changePasswordMutation,
  forgotPasswordMutation,
  getUserQuery,
  isEmailExistsQuery,
  meQuery,
  resendVerifySignUp as resendVerifySignUpMutation,
  verifyForgotPasswordMutation,
} from '~api/graphql-operations';
import { redis } from '~api/redis';
import { TokenTypes } from '~api/utils/constants';
import { gqlCall } from '~api/utils/test-utils';
import { createTokenLink } from '~api/utils/utils';
import { errorMessages } from '~utils/common';

let userId: string;
let name: string;
let email: string;
let conn: Connection;
beforeAll(async () => {
  conn = await connectTestDb();
  const user = await User.create({
    name: 'test user',
    email: 'testing@testing.co',
    password: '123456',
  }).save();
  userId = user.id;
  name = user.name;
  email = user.email;
});

afterAll(() => {
  conn.close();
});

describe('UserAccountUtils', () => {
  describe('resendVerifySignUp', () => {
    it('should send verify signup', async () => {
      const response = await gqlCall({
        source: print(resendVerifySignUpMutation),
        userId,
      });

      expect(response).toMatchObject({
        data: {
          resendVerifySignUp: true,
        },
      });

      const response2 = await gqlCall({
        source: print(resendVerifySignUpMutation),
        userId: '',
      });

      expect(response2).toMatchObject({
        data: {
          resendVerifySignUp: false,
        },
      });
    });
  });

  describe('isEmailExists', () => {
    it('should check email already exists', async () => {
      const response = await gqlCall({
        source: print(isEmailExistsQuery),
        variableValues: {
          email: 'testing@testing.co',
        },
      });

      expect(response).toMatchObject({
        data: {
          isEmailExists: true,
        },
      });

      const res1 = await gqlCall({
        source: print(isEmailExistsQuery),
        variableValues: {
          email: 'testing@blah.com',
        },
      });

      expect(res1).toMatchObject({
        data: {
          isEmailExists: false,
        },
      });

      const res = await gqlCall({
        source: print(isEmailExistsQuery),
        variableValues: {
          email: 'testing',
        },
      });

      expect(res).toMatchObject({
        errors: [{ message: 'Validation failed' }],
      });
    });
  });

  describe('me', () => {
    it('should return me', async () => {
      const response = await gqlCall({
        source: print(meQuery),
        userId,
      });
      expect(response).toMatchObject({
        data: {
          me: {
            name,
            email,
          },
        },
      });
    });
  });

  describe('getUser', () => {
    it('should return getUser', async () => {
      const response = await gqlCall({
        source: print(getUserQuery),
        variableValues: {
          id: '',
        },
      });

      expect(response).toMatchObject({ data: { getUser: null } });

      const res = await gqlCall({
        source: print(getUserQuery),
        variableValues: {
          id: userId,
        },
      });
      expect(res).toMatchObject({
        data: {
          getUser: {
            name,
            email,
          },
        },
      });
    });
  });

  describe('forgotPassword', () => {
    it('should send forgot password email', async () => {
      const response = await gqlCall({
        source: print(forgotPasswordMutation),
        variableValues: {
          email,
        },
        userId,
      });

      expect(response).toMatchObject({
        data: {
          forgotPassword: true,
        },
      });

      const response2 = await gqlCall({
        source: print(forgotPasswordMutation),
        variableValues: {
          email: '',
        },
        userId: '',
      });

      expect(response2).toMatchObject({
        data: {
          forgotPassword: false,
        },
      });
    });
  });

  describe('changePassword', () => {
    it('should send forgot password email', async () => {
      const response = await gqlCall({
        source: print(changePasswordMutation),
        variableValues: {
          oldPassword: '123456',
          password: '1234567',
        },
        userId,
      });

      expect(response).toMatchObject({
        data: {
          changePassword: {
            name,
            email,
          },
        },
      });

      const failCase = await gqlCall({
        source: print(changePasswordMutation),
        variableValues: {
          oldPassword: 'something',
          password: '1234567',
        },
        userId,
      });

      expect(failCase).toMatchObject({
        errors: [{ message: errorMessages.invalidOldPassword }],
      });

      const failCase3 = await gqlCall({
        source: print(changePasswordMutation),
        variableValues: {
          oldPassword: 'something',
          password: '1234567',
        },
        userId: '99',
      });

      expect(failCase3).toMatchObject({
        errors: [{ message: errorMessages.userNotFound }],
      });
    });
  });

  describe('changeEmail', () => {
    it('should send forgot password email', async () => {
      const response = await gqlCall({
        source: print(changeEmailMutation),
        variableValues: {
          email: 'email@email.com',
        },
        userId,
      });

      expect(response).toMatchObject({
        data: {
          changeEmail: {
            name,
            email: 'email@email.com',
          },
        },
      });

      const res2 = await gqlCall({
        source: print(changeEmailMutation),
        variableValues: {
          email: 'email@email.com',
        },
        userId: '99',
      });

      expect(res2).toMatchObject({
        errors: [{ message: errorMessages.userNotFound }],
      });

      const fail = await gqlCall({
        source: print(changeEmailMutation),
        variableValues: {
          email: 'email@email.com',
        },
        userId,
      });

      expect(fail).toMatchObject({
        errors: [{ message: errorMessages.newEmailSameAsOld }],
      });
    });
  });

  describe('verifyForgotPassword', () => {
    it('should send forgot password email', async () => {
      const t = await createTokenLink('/', userId, redis, TokenTypes.reset);
      const token = extractToken(t);
      const response = await gqlCall({
        source: print(verifyForgotPasswordMutation),
        variableValues: {
          token,
          password: 'newPassword',
          confirmPassword: 'newPassword',
        },
        userId,
      });

      expect(response).toMatchObject({
        data: {
          verifyForgotPassword: {
            id: userId,
          },
        },
      });
      const res = await gqlCall({
        source: print(verifyForgotPasswordMutation),
        variableValues: {
          token,
          password: 'newPassword',
          confirmPassword: 'newPassword2',
        },
        userId,
      });

      expect(res).toMatchObject({
        errors: [{ message: errorMessages.passwordsDoNotMatch }],
      });

      const res2 = await gqlCall({
        source: print(verifyForgotPasswordMutation),
        variableValues: {
          token: '',
          password: 'newPassword',
          confirmPassword: 'newPassword',
        },
        userId,
      });

      expect(res2).toMatchObject({
        errors: [{ message: errorMessages.invalidToken }],
      });
    });
  });
});

function extractToken(t: string) {
  return t.split('/').splice(-1)[0];
}
