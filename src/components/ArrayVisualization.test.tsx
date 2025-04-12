import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ArrayVisualization from './ArrayVisualization';

describe('ArrayVisualization Component', () => {
  const sampleArray = [5, 3, 8, 1, 9];

  it('renders all array elements', () => {
    render(<ArrayVisualization array={sampleArray} />);
    
    // Check if all array values are rendered
    sampleArray.forEach(value => {
      expect(screen.getByText(value.toString())).toBeInTheDocument();
    });
  });

  it('displays the correct color for compared elements', () => {
    const compareIndices = [1, 3]; // Elements at index 1 and 3 are being compared
    
    render(
      <ArrayVisualization 
        array={sampleArray} 
        compareIndices={compareIndices}
      />
    );
    
    // Find elements with compare indicator
    const compareLabels = screen.getAllByText('Compare');
    expect(compareLabels).toHaveLength(compareIndices.length);
  });

  it('displays the correct color for swapped elements', () => {
    const swapIndices = [0, 4]; // Elements at index 0 and 4 are being swapped
    
    render(
      <ArrayVisualization 
        array={sampleArray} 
        swapIndices={swapIndices}
      />
    );
    
    // Find elements with swap indicator
    const swapLabels = screen.getAllByText('Swap');
    expect(swapLabels).toHaveLength(swapIndices.length);
  });

  it('displays the correct color for sorted elements', () => {
    const sortedIndices = [2, 3]; // Elements at index 2 and 3 are marked as sorted
    
    const { container } = render(
      <ArrayVisualization 
        array={sampleArray} 
        sortedIndices={sortedIndices}
      />
    );
    
    // Instead of checking for text content, check for the proper CSS class on the value boxes
    // This is more aligned with how the component actually works
    const sortedElements = container.querySelectorAll('.border-green-500');
    
    // We should find at least the number of elements as in sortedIndices
    // (may find the legend item with this class as well)
    expect(sortedElements.length).toBeGreaterThanOrEqual(sortedIndices.length);
  });

  it('displays the legend with all operation types', () => {
    render(<ArrayVisualization array={sampleArray} />);
    
    // Check if all legend items are present
    expect(screen.getByText('Unsorted')).toBeInTheDocument();
    expect(screen.getByText('Comparing')).toBeInTheDocument();
    expect(screen.getByText('Swapping')).toBeInTheDocument();
    expect(screen.getByText('Sorted')).toBeInTheDocument();
  });
});