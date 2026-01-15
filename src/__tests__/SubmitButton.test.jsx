import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import SubmitButton from '../components/SubmitButton';

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

describe('SubmitButton Mouse Tracking', () => {
  test('renders submit button with correct text and attributes', () => {
    render(<SubmitButton />);
    const button = screen.getByTestId('submit-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Submit Password');
    expect(button).toHaveAttribute('type', 'button');
  });

  test('tracks mouse enter events for security analysis', () => {
    render(<SubmitButton />);
    const button = screen.getByTestId('submit-button');
    fireEvent.mouseEnter(button);
    expect(securityLogs).toContain('Mouse Entering');
    expect(securityLogs).toHaveLength(1);
  });

  test('tracks mouse leave events for security analysis', () => {
    render(<SubmitButton />);
    const button = screen.getByTestId('submit-button');
    fireEvent.mouseLeave(button);
    expect(securityLogs).toContain('Mouse Exiting');
    expect(securityLogs).toHaveLength(1);
  });

  test('handles click events with security logging', () => {
    const mockOnClick = vi.fn();
    render(<SubmitButton onClick={mockOnClick} />);
    const button = screen.getByTestId('submit-button');
    fireEvent.click(button);
    expect(securityLogs).toContain('Submit button clicked - Security check initiated');
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('respects disabled state', () => {
    const mockOnClick = vi.fn();
    render(<SubmitButton onClick={mockOnClick} disabled={true} />);
    const button = screen.getByTestId('submit-button');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
