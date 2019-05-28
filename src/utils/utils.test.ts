// import { errorMessages } from '~utils/common';
import { isAuthenticated, printMessage } from './utils';

describe('utils', () => {
  describe('printMessage', () => {
    it('should print hello str', () => {
      expect(printMessage('Mark')).toEqual('Hello Mark');
    });
  });

  describe('isAuthenticated', () => {
    it('check is authenticated', () => {
      const ctx = {
        req: {
          session: {
            userId: 123,
          },
        },
      };
      expect(() => isAuthenticated(ctx as any)).not.toThrow();

      const ctx1 = { ...ctx, req: { session: { userId: '' } } };
      expect(() => isAuthenticated(ctx1 as any)).toThrow();
    });
  });
});
