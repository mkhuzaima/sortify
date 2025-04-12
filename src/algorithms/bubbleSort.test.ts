import { describe, it, expect } from 'vitest';
import { bubbleSort } from './bubbleSort';

describe('Bubble Sort Algorithm', () => {
  it('should correctly sort an array', () => {
    const input = [5, 3, 8, 4, 2];
    const steps = bubbleSort(input);
    
    // The last step should contain the sorted array
    const lastStep = steps[steps.length - 1];
    expect(lastStep.arrayState).toEqual([2, 3, 4, 5, 8]);
  });
  
  it('should generate comparison and swap steps', () => {
    const input = [5, 3, 1];
    const steps = bubbleSort(input);
    
    // Check if there are compare and swap steps
    const compareSteps = steps.filter(step => step.type === 'compare');
    const swapSteps = steps.filter(step => step.type === 'swap');
    
    expect(compareSteps.length).toBeGreaterThan(0);
    expect(swapSteps.length).toBeGreaterThan(0);
  });
  
  it('should mark elements as sorted', () => {
    const input = [3, 1, 2];
    const steps = bubbleSort(input);
    
    // Check if some elements are marked as sorted
    const markSortedSteps = steps.filter(step => step.type === 'markSorted');
    
    expect(markSortedSteps.length).toBeGreaterThan(0);
  });
  
  it('should handle already sorted arrays efficiently', () => {
    const input = [1, 2, 3, 4, 5];
    const steps = bubbleSort(input);
    
    // Should not have any swap steps for already sorted array
    const swapSteps = steps.filter(step => step.type === 'swap');
    expect(swapSteps.length).toBe(0);
  });
  
  it('should handle arrays with duplicate values', () => {
    const input = [4, 2, 4, 1, 3];
    const steps = bubbleSort(input);
    
    // The last step should contain the sorted array
    const lastStep = steps[steps.length - 1];
    expect(lastStep.arrayState).toEqual([1, 2, 3, 4, 4]);
  });
});