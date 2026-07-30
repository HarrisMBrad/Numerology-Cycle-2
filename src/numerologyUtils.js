// src/numerologyUtils.js

// Placeholder function for our first test
export function reduceToSingleDigit(number) {
    if (number === 11 || number === 22) {
        return number; // Master Numbers
    }
    let sum = String(number).split('').map(Number).reduce((a, b) => a + b, 0);
    return sum >= 10 ? reduceToSingleDigit(sum) : sum;
}

// Life Path Number: sum every digit of the full birth date (YYYY-MM-DD),
// then reduce — Master Numbers (11, 22) are preserved by reduceToSingleDigit.
export function calculateLifePath(dateString) {
    if (typeof dateString !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        throw new Error('calculateLifePath expects a date string formatted as YYYY-MM-DD');
    }
    const sum = dateString
        .replace(/-/g, '')
        .split('')
        .map(Number)
        .reduce((a, b) => a + b, 0);
    return reduceToSingleDigit(sum);
}

// Personal Year Number: birth month + birth day + the target calendar year,
// reduced to a single digit. Defaults to the current year when none is given.
export function calculatePersonalYear(birthDateString, year = new Date().getFullYear()) {
    if (typeof birthDateString !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(birthDateString)) {
        throw new Error('calculatePersonalYear expects a birth date string formatted as YYYY-MM-DD');
    }
    const [, month, day] = birthDateString.split('-').map(Number);
    const sum = month + day + year;
    return reduceToSingleDigit(sum);
}
