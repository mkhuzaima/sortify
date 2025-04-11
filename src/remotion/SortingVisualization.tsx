import { useCurrentFrame } from 'remotion';
import { Step } from '../algorithms/types';
import ArrayVisualization from '../components/ArrayVisualization';

interface SortingVisualizationProps {
  steps: Step[];
  title: string;
  stepsPerSecond: number;
}

const SortingVisualization = ({ steps, title, stepsPerSecond = 2 }: SortingVisualizationProps) => {
  const frame = useCurrentFrame();
  const currentStepIndex = Math.min(Math.floor(frame / (60 / stepsPerSecond)), steps.length - 1);
  const currentStep = steps[currentStepIndex];
  
  const { type, indices, arrayState } = currentStep;
  
  // Track sorted indices as they accumulate
  const sortedIndices = steps
    .slice(0, currentStepIndex + 1)
    .filter(step => step.type === 'markSorted')
    .flatMap(step => step.indices);

  // Determine which indices are being compared or swapped in the current step
  const compareIndices = type === 'compare' ? indices : [];
  const swapIndices = type === 'swap' ? indices : [];

  return (
    <div className="w-full h-full bg-gray-100 p-8 flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-8">{title} Visualization</h1>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <ArrayVisualization 
          array={arrayState} 
          compareIndices={compareIndices}
          swapIndices={swapIndices}
          sortedIndices={sortedIndices}
        />
        
        <div className="mt-8 text-xl">
          Step {currentStepIndex + 1} of {steps.length}: 
          {type === 'compare' && ' Comparing elements'}
          {type === 'swap' && ' Swapping elements'}
          {type === 'markSorted' && ' Marking as sorted'}
        </div>
      </div>
    </div>
  );
};

export default SortingVisualization;