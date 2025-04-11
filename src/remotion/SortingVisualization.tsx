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
  
  // Extract loop variables i and j from the step index patterns
  // This is a heuristic approach based on common sorting algorithm patterns
  const getLoopVariables = () => {
    if (indices.length !== 2) return {};
    
    // For bubble sort and similar algorithms
    if (type === 'compare' && indices[0] + 1 === indices[1]) {
      return {
        i: Math.floor(indices[0] / (arrayState.length - 1) * (arrayState.length - 1)),
        j: indices[0]
      };
    }
    
    // For selection sort and similar algorithms
    if (type === 'compare') {
      return {
        i: indices[0],
        j: indices[1]
      };
    }
    
    return {};
  };

  // Format the action text based on the current step type
  const getActionText = () => {
    switch(type) {
      case 'compare':
        return `🔍 Comparing elements ${indices.map(i => arrayState[i]).join(' and ')}`;
      case 'swap':
        return `🔄 Swapping elements ${indices.map(i => arrayState[i]).join(' and ')}`;
      case 'markSorted':
        return `✅ Marking element ${indices.map(i => arrayState[i]).join(', ')} as sorted`;
      default:
        return '';
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-blue-50 to-gray-100 p-8 flex flex-col">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-blue-800">{title} Visualization</h1>
        <p className="text-gray-600 text-center">Step-by-step sorting process visualization</p>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <ArrayVisualization 
          array={arrayState} 
          compareIndices={compareIndices}
          swapIndices={swapIndices}
          sortedIndices={sortedIndices}
          loopVariables={getLoopVariables()}
        />
        
        <div className="flex items-center justify-between w-full mt-4 p-4 bg-white rounded-lg border border-gray-200 shadow-md">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-700">Algorithm:</span>
              <span className="text-blue-700">{title}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-700">Step:</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full border border-blue-200">
                {currentStepIndex + 1} of {steps.length}
              </span>
            </div>
          </div>
          
          <div>
            <span className={`font-semibold px-3 py-1 rounded-full border
              ${type === 'compare' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 
              type === 'swap' ? 'bg-red-100 text-red-800 border-red-300' : 
              'bg-green-100 text-green-800 border-green-300'}`}>
              {getActionText()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualization;