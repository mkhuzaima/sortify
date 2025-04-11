/**
 * Parses a string input into an array of numbers
 * 
 * @param input String input of comma-separated numbers (e.g. "5, 2, 9, 1")
 * @returns Array of numbers, or null if the input is invalid
 */
export const parseArrayInput = (input: string): number[] | null => {
  // Remove all whitespace and split by comma
  const trimmedInput = input.trim();
  if (!trimmedInput) return null;
  
  // Split by comma and parse each item as a number
  const items = trimmedInput.split(',').map(item => item.trim());
  const numbers = items.map(item => parseInt(item, 10));
  
  // Check if all items are valid numbers
  if (numbers.some(isNaN)) {
    return null;
  }
  
  return numbers;
};

/**
 * Validates the parsed array to ensure it contains valid integers
 * 
 * @param array Array of numbers to validate
 * @returns True if the array is valid, false otherwise
 */
export const validateArray = (array: number[] | null): boolean => {
  if (array === null || array.length <= 1) {
    return false;
  }
  
  // Ensure all elements are integers
  return array.every(num => Number.isInteger(num));
};

/**
 * Gets the maximum value in an array
 * 
 * @param array Array of numbers
 * @returns The maximum value in the array
 */
export const getMaxValue = (array: number[]): number => {
  return Math.max(...array);
};

/**
 * Gets the minimum value in an array
 * 
 * @param array Array of numbers
 * @returns The minimum value in the array
 */
export const getMinValue = (array: number[]): number => {
  return Math.min(...array);
};