import { getMaxValue } from '../utils/arrayUtils';

interface ArrayVisualizationProps {
  array: number[];
  compareIndices?: number[];
  swapIndices?: number[];
  sortedIndices?: number[];
}

const ArrayVisualization = ({
  array,
  compareIndices = [],
  swapIndices = [],
  sortedIndices = []
}: ArrayVisualizationProps) => {
  const maxValue = getMaxValue(array);
  
  // Get the appropriate color for a bar based on its index
  const getBarColor = (index: number) => {
    if (sortedIndices.includes(index)) {
      return 'bg-green-500'; // Sorted element
    } else if (swapIndices.includes(index)) {
      return 'bg-red-500'; // Elements being swapped
    } else if (compareIndices.includes(index)) {
      return 'bg-yellow-400'; // Elements being compared
    } else {
      return 'bg-blue-500'; // Default color
    }
  };

  return (
    <div className="flex items-end justify-center space-x-1 h-64 w-full">
      {array.map((value, index) => {
        const height = `${(value / maxValue) * 100}%`;
        
        return (
          <div
            key={`${index}-${value}`}
            className="w-full relative flex flex-col items-center"
          >
            <div
              className={`w-full ${getBarColor(index)} transition-all duration-300`}
              style={{ height }}
              aria-label={`Value: ${value}`}
            ></div>
            <span className="mt-2 text-xs">{value}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ArrayVisualization;