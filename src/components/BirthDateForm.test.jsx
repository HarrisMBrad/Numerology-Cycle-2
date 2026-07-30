import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BirthDateForm from './BirthDateForm';

describe('BirthDateForm', () => {

    test('renders a date input and a submit button', () => {
        render(<BirthDateForm onCalculate={() => {}} />);
        expect(screen.getByLabelText(/birth date/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument();
    });

    test('calls onCalculate with the correct Life Path and Personal Year for a valid date', () => {
        const onCalculate = jest.fn();
        render(<BirthDateForm onCalculate={onCalculate} currentYear={2026} />);

        fireEvent.change(screen.getByLabelText(/birth date/i), {
            target: { value: '1994-06-15' },
        });
        fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

        // Life Path: 1+9+9+4+0+6+1+5=35 -> 8
        // Personal Year (2026): 6+15+2026=2047 -> 4
        expect(onCalculate).toHaveBeenCalledWith({
            birthDate: '1994-06-15',
            lifePath: 8,
            personalYear: 4,
        });
    });

    test('shows an error and does not call onCalculate when submitted empty', () => {
        const onCalculate = jest.fn();
        render(<BirthDateForm onCalculate={onCalculate} />);

        fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

        expect(screen.getByRole('alert')).toHaveTextContent(/enter a birth date/i);
        expect(onCalculate).not.toHaveBeenCalled();
    });

    test('clears a previous error once a valid date is submitted', () => {
        const onCalculate = jest.fn();
        render(<BirthDateForm onCalculate={onCalculate} currentYear={2026} />);

        // trigger the error first
        fireEvent.click(screen.getByRole('button', { name: /calculate/i }));
        expect(screen.getByRole('alert')).toBeInTheDocument();

        // then correct it
        fireEvent.change(screen.getByLabelText(/birth date/i), {
            target: { value: '1994-06-15' },
        });
        fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        expect(onCalculate).toHaveBeenCalledTimes(1);
    });
});
