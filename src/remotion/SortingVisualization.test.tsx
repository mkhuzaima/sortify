import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import SortingVisualization from './SortingVisualization';

// Mock the ArrayVisualization component
vi.mock('../components/ArrayVisualization', () => {
  return {
    default: vi.fn().mockImplementation(props => (
      <div data-testid="mock-array-visualization">
        {JSON.stringify(props)}
      </div>
    )),
  };
});

// Import the mock directly
import ArrayVisualizationMock from '../components/ArrayVisualization';

// Mock the Remotion hooks
vi.mock('remotion', () => ({
  useCurrentFrame: () => 0,
  useVideoConfig: () => ({
    fps: 30,
    width: 1280,
    height: 720,
    durationInFrames: 300,
  }),
}));

describe('SortingVisualization Component', () => {
  const sampleSteps = [
    {
      type: 'compare',
      indices: [0, 1],
      arrayState: [5, 3, 8, 4, 2],
    },
    {
      type: 'swap',
      indices: [0, 1],
      arrayState: [3, 5, 8, 4, 2],
    },
    {
      type: 'markSorted',
      indices: [4],
      arrayState: [2, 3, 4, 5, 8],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the visualization with correct algorithm title', () => {
    const { getByText } = render(
      <SortingVisualization 
        steps={sampleSteps}
        title="Bubble Sort"
        stepsPerSecond={2}
      />
    );
    
    expect(getByText('Bubble Sort Visualization')).toBeInTheDocument();
    expect(getByText('Step-by-step sorting process visualization')).toBeInTheDocument();
  });

  it('displays algorithm information in the footer', () => {
    const { getByText } = render(
      <SortingVisualization 
        steps={sampleSteps}
        title="Selection Sort"
        stepsPerSecond={2}
      />
    );
    
    expect(getByText('Algorithm:')).toBeInTheDocument();
    expect(getByText('Selection Sort')).toBeInTheDocument();
  });

  it('shows the current step number and total steps', () => {
    const { getByText } = render(
      <SortingVisualization 
        steps={sampleSteps}
        title="Bubble Sort"
        stepsPerSecond={2}
      />
    );
    
    // Since we mocked useCurrentFrame to return 0, we should be at step 1
    expect(getByText('1 of 3')).toBeInTheDocument();
  });

  it('passes the correct props to the ArrayVisualization component', () => {
    render(
      <SortingVisualization 
        steps={sampleSteps}
        title="Bubble Sort"
        stepsPerSecond={2}
      />
    );
    
    // Check if the ArrayVisualization mock was called
    expect(ArrayVisualizationMock).toHaveBeenCalled();
    
    // Check the first argument (props) separately
    const mockCall = ArrayVisualizationMock.mock.calls[0];
    const propsArg = mockCall[0];
    
    // Verify the props received by the component
    expect(propsArg.array).toEqual(sampleSteps[0].arrayState);
    expect(propsArg.compareIndices).toEqual(sampleSteps[0].indices);
    expect(propsArg.sortedIndices).toEqual([]);
    expect(propsArg.swapIndices).toEqual([]);
  });
});