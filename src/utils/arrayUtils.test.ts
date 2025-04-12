import { describe, it, expect } from 'vitest';
import { parseArrayInput, validateArray, getMaxValue } from './arrayUtils';

describe('Array Utilities', () => {
  describe('parseArrayInput', () => {
    it('should parse valid comma-separated numbers', () => {
      expect(parseArrayInput('1, 5, 3, 2')).toEqual([1, 5, 3, 2]);
      expect(parseArrayInput('10,20,30')).toEqual([10, 20, 30]);
    });

    it('should handle spaces and empty entries', () => {
      expect(parseArrayInput('1,  2,   3')).toEqual([1, 2, 3]);
      expect(parseArrayInput('1, , 3')).toEqual([1, 3]);
    });

    it('should return null for non-numeric inputs', () => {
      expect(parseArrayInput('a, b, c')).toBeNull();
      expect(parseArrayInput('1, abc, 3')).toBeNull();
    });
  });

  describe('validateArray', () => {
    it('should return true for valid arrays with at least 2 elements', () => {
      expect(validateArray([1, 2])).toBe(true);
      expect(validateArray([5, 3, 1, 4, 2])).toBe(true);
    });

    it('should return false for arrays with fewer than 2 elements', () => {
      expect(validateArray([1])).toBe(false);
      expect(validateArray([])).toBe(false);
    });

    it('should return false for null or undefined', () => {
      expect(validateArray(null)).toBe(false);
      expect(validateArray(undefined)).toBe(false);
    });
  });

  describe('getMaxValue', () => {
    it('should return the maximum value in an array', () => {
      expect(getMaxValue([1, 5, 3, 2])).toBe(5);
      expect(getMaxValue([10, 20, 30])).toBe(30);
      expect(getMaxValue([-5, -10, -3])).toBe(-3);
    });

    it('should return the only value for single-element arrays', () => {
      expect(getMaxValue([42])).toBe(42);
    });

    it('should handle empty arrays', () => {
      expect(getMaxValue([])).toBe(0);
    });
  });
});