import { Step, SortingAlgorithm } from './types';

/**
 * Implementation of Bubble Sort algorithm with step-by-step tracking
 * Time complexity: O(n²)
 * Space complexity: O(1) for sorting, O(n²) for step tracking
 * 
 * @param array The array to sort
 * @returns Array of steps showing the sorting process
 */
export const bubbleSort = (array: number[]): Step[] => {
  // Create a copy of the input array to avoid mutating the original
  const arr = [...array];
  const steps: Step[] = [];
  const n = arr.length;
  
  // Flag to optimize the algorithm by skipping unnecessary iterations
  let swapped = false;
  
  // Sorted elements start from the end
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    
    // Last i elements are already in place
    for (let j = 0; j < n - i - 1; j++) {
      // Record comparison step
      steps.push({
        type: "compare",
        indices: [j, j + 1],
        arrayState: [...arr],
      });
      
      // Compare and swap if needed
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        
        // Record swap step
        steps.push({
          type: "swap",
          indices: [j, j + 1],
          arrayState: [...arr],
        });
        
        swapped = true;
      }
    }
    
    // Mark the last element of this pass as sorted
    steps.push({
      type: "markSorted",
      indices: [n - i - 1],
      arrayState: [...arr],
    });
    
    // If no swapping occurred, array is sorted
    if (!swapped) break;
  }
  
  // Mark all remaining elements as sorted if we exited early
  if (!swapped) {
    for (let i = 0; i < n - 1; i++) {
      steps.push({
        type: "markSorted",
        indices: [i],
        arrayState: [...arr],
      });
    }
  }
  
  return steps;
};

export const bubbleSortAlgorithm: SortingAlgorithm = {
  name: "Bubble Sort",
  sort: bubbleSort,
  description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
};