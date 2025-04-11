import { Step, SortingAlgorithm } from './types';

/**
 * Implementation of Selection Sort algorithm with step-by-step tracking
 * Time complexity: O(n²)
 * Space complexity: O(1) for sorting, O(n²) for step tracking
 * 
 * @param array The array to sort
 * @returns Array of steps showing the sorting process
 */
export const selectionSort = (array: number[]): Step[] => {
  // Create a copy of the input array to avoid mutating the original
  const arr = [...array];
  const steps: Step[] = [];
  const n = arr.length;
  
  // One by one move boundary of unsorted subarray
  for (let i = 0; i < n - 1; i++) {
    // Find the minimum element in unsorted array
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      // Record comparison step
      steps.push({
        type: "compare",
        indices: [minIdx, j],
        arrayState: [...arr],
      });
      
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    // Swap the found minimum element with the first element
    if (minIdx !== i) {
      // Record swap step
      steps.push({
        type: "swap",
        indices: [i, minIdx],
        arrayState: [...arr],
      });
      
      // Swap elements
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      
      // Record the new state after swap
      steps.push({
        type: "compare",
        indices: [],
        arrayState: [...arr],
      });
    }
    
    // Mark the element at position i as sorted
    steps.push({
      type: "markSorted",
      indices: [i],
      arrayState: [...arr],
    });
  }
  
  // Mark the last element as sorted
  steps.push({
    type: "markSorted",
    indices: [n - 1],
    arrayState: [...arr],
  });
  
  return steps;
};

export const selectionSortAlgorithm: SortingAlgorithm = {
  name: "Selection Sort",
  sort: selectionSort,
  description: "A simple sorting algorithm that divides the input array into a sorted and an unsorted region, and repeatedly selects the smallest element from the unsorted region and moves it to the sorted region."
};