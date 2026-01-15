import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import PasswordInput from '../components/PasswordInput';

const originalConsoleLog = console.log;
let securityLogs = [];

beforeEach(() => {
  securityLogs = [];
  console.log = vi.fn((message) => {
    securityLogs.push(message);
    originalConsoleLog(message);
  });
});

afterEach(() => {
  console.log = originalConsoleLog;
});

describe('PasswordInput Security Tracking', () => {
  test('renders password input field with correct attributes', () => {
    render(<PasswordInput />);
    const input = screen.getByTestId('password-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('placeholder', 'Enter your password');
  });

  test('tracks password changes and logs security events', () => {
    const mockOnChange = vi.fn();
    render(<PasswordInput onPasswordChange={mockOnChange} />);
    const input = screen.getByTestId('password-input');
    
    fireEvent.change(input, { target: { value: 'p' } });
    fireEvent.change(input, { target: { value: 'pa' } });
    
    expect(securityLogs).toContain('Entering password…');
    expect(securityLogs).toHaveLength(2);
    expect(mockOnChange).toHaveBeenCalledTimes(2);
  });

  test('displays character count when typing', () => {
    render(<PasswordInput />);
    const input = screen.getByTestId('password-input');
    fireEvent.change(input, { target: { value: 'test123' } });
    expect(screen.getByTestId('character-count')).toHaveTextContent('7 characters');
  });

  test('does not display character count when empty', () => {
    render(<PasswordInput />);
    expect(screen.queryByTestId('character-count')).not.toBeInTheDocument();
  });
});
