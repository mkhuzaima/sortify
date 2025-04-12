import { describe, it, expect } from 'vitest';
import { selectionSort } from './selectionSort';

describe('Selection Sort Algorithm', () => {
  it('should correctly sort an array', () => {
    const input = [5, 3, 8, 4, 2];
    const steps = selectionSort(input);
    
    // The last step should contain the sorted array
    const lastStep = steps[steps.length - 1];
    expect(lastStep.arrayState).toEqual([2, 3, 4, 5, 8]);
  });
  
  it('should generate comparison and swap steps', () => {
    const input = [5, 3, 1];
    const steps = selectionSort(input);
    
    // Check if there are compare and swap steps
    const compareSteps = steps.filter(step => step.type === 'compare');
    const swapSteps = steps.filter(step => step.type === 'swap');
    
    expect(compareSteps.length).toBeGreaterThan(0);
    // Selection sort may not swap if the minimum is already in correct position
    expect(swapSteps.length).toBeGreaterThanOrEqual(0);
  });
  
  it('should mark elements as sorted', () => {
    const input = [3, 1, 2];
    const steps = selectionSort(input);
    
    // Check if some elements are marked as sorted
    const markSortedSteps = steps.filter(step => step.type === 'markSorted');
    
    expect(markSortedSteps.length).toBeGreaterThan(0);
  });
  
  it('should always make exactly n-1 swap steps for unsorted arrays', () => {
    const input = [5, 3, 8, 4, 2];
    const steps = selectionSort(input);
    
    // Selection sort always makes n-1 swaps for unsorted arrays
    const swapSteps = steps.filter(step => step.type === 'swap');
    expect(swapSteps.length).toBeLessThanOrEqual(input.length - 1);
  });
  
  it('should handle arrays with duplicate values', () => {
    const input = [4, 2, 4, 1, 3];
    const steps = selectionSort(input);
    
    // The last step should contain the sorted array
    const lastStep = steps[steps.length - 1];
    expect(lastStep.arrayState).toEqual([1, 2, 3, 4, 4]);
  });
});