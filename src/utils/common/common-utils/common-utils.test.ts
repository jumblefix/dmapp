import { add, reverseArray } from './common-utils';

describe('common utils', () => {
  describe('add', () => {
    it('should add two numbers', () => {
      expect(add(1, 2)).toEqual(3);
    });
  });
  describe('reverseArray', () => {
    it('should reverse given array', () => {
      expect(reverseArray([1, 2])).toEqual([2, 1]);
    });
  });
});
