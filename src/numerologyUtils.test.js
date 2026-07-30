// src/numerologyUtils.test.js

import { reduceToSingleDigit, calculateLifePath, calculatePersonalYear } from './numerologyUtils';

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

describe('Life Path Calculation', () => {

    // '1994-06-15' -> 1+9+9+4+0+6+1+5 = 35 -> 3+5 = 8
    test('should reduce a birth date to a single-digit Life Path number', () => {
        expect(calculateLifePath('1994-06-15')).toBe(8);
    });

    // '1990-01-09' -> 1+9+9+0+0+1+0+9 = 29 -> 2+9 = 11 (Master Number, preserved)
    test('should preserve a Master Number Life Path instead of reducing it further', () => {
        expect(calculateLifePath('1990-01-09')).toBe(11);
    });

    test('should throw on a malformed date string', () => {
        expect(() => calculateLifePath('not-a-date')).toThrow();
    });
});

describe('Personal Year Calculation', () => {

    // month 6 + day 15 + year 2026 = 2047 -> 2+0+4+7 = 13 -> 1+3 = 4
    test('should calculate the Personal Year number for a given birth date and year', () => {
        expect(calculatePersonalYear('1994-06-15', 2026)).toBe(4);
    });

    test('should default to the current calendar year when none is provided', () => {
        const currentYear = new Date().getFullYear();
        const expected = calculatePersonalYear('1994-06-15', currentYear);
        expect(calculatePersonalYear('1994-06-15')).toBe(expected);
    });
});