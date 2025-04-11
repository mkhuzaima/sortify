import { SortingAlgorithm } from './types';
import { bubbleSortAlgorithm } from './bubbleSort';
import { selectionSortAlgorithm } from './selectionSort';

// Export all available sorting algorithms
export const sortingAlgorithms: SortingAlgorithm[] = [
  bubbleSortAlgorithm,
  selectionSortAlgorithm
];

// Re-export types
export * from './types';