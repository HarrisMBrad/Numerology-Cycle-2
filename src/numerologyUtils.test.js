// src/numerologyUtils.test.js

import { reduceToSingleDigit } from './numerologyUtils';

describe('Numerology Utility Functions', () => {

    // Test Case 1: Standard reduction
    test('should reduce a multi-digit number to a single digit', () => {
        // 1 + 9 + 9 + 4 = 23 -> 2 + 3 = 5
        expect(reduceToSingleDigit(1994)).toBe(5);
    });

    // Test Case 2: Master Number
    test('should return Master Number 11 without reduction', () => {
        expect(reduceToSingleDigit(11)).toBe(11);
    });

    // Test Case 3: Single digit number
    test('should return a single digit number as is', () => {
        expect(reduceToSingleDigit(7)).toBe(7);
    });
});