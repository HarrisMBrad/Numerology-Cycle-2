// src/numerologyUtils.js

// Placeholder function for our first test
export function reduceToSingleDigit(number) {
    if (number === 11 || number === 22) {
        return number; // Master Numbers
    }
    let sum = String(number).split('').map(Number).reduce((a, b) => a + b, 0);
    return sum >= 10 ? reduceToSingleDigit(sum) : sum;
}
