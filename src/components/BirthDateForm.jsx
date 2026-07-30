import React, { useState } from 'react';
import { calculateLifePath, calculatePersonalYear } from '../numerologyUtils';

// Captures a birth date and hands the computed Life Path + Personal Year
// numbers up to the parent via onCalculate. Deliberately does not render
// results itself — stays a pure input component.
function BirthDateForm({ onCalculate, currentYear }) {
    const [birthDate, setBirthDate] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!birthDate) {
            setError('Please enter a birth date.');
            return;
        }

        try {
            const lifePath = calculateLifePath(birthDate);
            const personalYear = calculatePersonalYear(birthDate, currentYear);
            setError(null);
            onCalculate({ birthDate, lifePath, personalYear });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="birth-date-input">Birth Date</label>
            <input
                id="birth-date-input"
                type="date"
                value={birthDate}
                onChange={(event) => setBirthDate(event.target.value)}
            />
            <button type="submit">Calculate</button>
            {error && <p role="alert">{error}</p>}
        </form>
    );
}

export default BirthDateForm;
