/**
 * Defines the types of steps that can occur during a sorting algorithm
 */
export type StepType = "compare" | "swap" | "markSorted";

/**
 * Represents a single step in a sorting algorithm
 */
export type Step = {
  type: StepType;
  indices: number[];
  arrayState: number[];
};

/**
 * Interface for sorting algorithms
 */
export interface SortingAlgorithm {
  name: string;
  sort: (array: number[]) => Step[];
  description: string;
}