import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputForm from './InputForm';

describe('InputForm Component', () => {
  const mockSubmit = vi.fn();
  
  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('renders the input form correctly', () => {
    render(<InputForm onSubmit={mockSubmit} />);
    
    expect(screen.getByLabelText(/enter numbers/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select sorting algorithm/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate visualization/i })).toBeInTheDocument();
  });

  it('allows typing in the input field', async () => {
    render(<InputForm onSubmit={mockSubmit} />);
    
    const input = screen.getByLabelText(/enter numbers/i);
    await userEvent.type(input, '5, 3, 1, 4');
    
    expect(input).toHaveValue('5, 3, 1, 4');
  });

  it('allows selecting algorithm from dropdown', async () => {
    render(<InputForm onSubmit={mockSubmit} />);
    
    const select = screen.getByLabelText(/select sorting algorithm/i);
    await userEvent.selectOptions(select, 'Bubble Sort');
    
    expect(select).toHaveValue('0'); // assuming 0 is the value for Bubble Sort
  });

  it('shows error for invalid input', async () => {
    render(<InputForm onSubmit={mockSubmit} />);
    
    const input = screen.getByLabelText(/enter numbers/i);
    await userEvent.type(input, 'abc, def');
    
    const submitButton = screen.getByRole('button', { name: /generate visualization/i });
    await userEvent.click(submitButton);
    
    expect(screen.getByText(/please enter a valid comma-separated list/i)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with correct parameters for valid input', async () => {
    render(<InputForm onSubmit={mockSubmit} />);
    
    // Enter valid array
    const input = screen.getByLabelText(/enter numbers/i);
    await userEvent.type(input, '5, 3, 1, 4');
    
    // Select algorithm
    const select = screen.getByLabelText(/select sorting algorithm/i);
    await userEvent.selectOptions(select, '1'); // Selection Sort
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /generate visualization/i });
    await userEvent.click(submitButton);
    
    // Check if onSubmit was called with correct params (actual implementation only passes 2 params)
    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith([5, 3, 1, 4], 1);
  });

  it('loads example arrays when example buttons are clicked', async () => {
    render(<InputForm onSubmit={mockSubmit} />);
    
    const exampleButtons = screen.getAllByText(/example \d/i);
    expect(exampleButtons.length).toBeGreaterThan(0);
    
    await userEvent.click(exampleButtons[0]);
    
    const input = screen.getByLabelText(/enter numbers/i);
    expect(input).not.toHaveValue('');
  });
});