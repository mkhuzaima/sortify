import {getMaxValue} from "../utils/arrayUtils";
import {useEffect, useState} from "react";

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
  sortedIndices = [],
}: ArrayVisualizationProps) => {
  const maxValue = getMaxValue(array);
  const [prevArray, setPrevArray] = useState<number[]>(array);

  // Determine if elements have changed position to trigger animation
  useEffect(() => {
    if (JSON.stringify(prevArray) !== JSON.stringify(array)) {
      const timer = setTimeout(() => {
        setPrevArray(array);
      }, 300); // Match the duration in the CSS transition
      return () => clearTimeout(timer);
    }
  }, [array, prevArray]);

  // Get the appropriate color for a bar based on its index
  const getBarColor = (index: number) => {
    if (sortedIndices.includes(index)) {
      return "bg-green-100 border-green-500"; // Sorted element
    } else if (swapIndices.includes(index)) {
      return "bg-red-100 border-red-500"; // Elements being swapped
    } else if (compareIndices.includes(index)) {
      return "bg-yellow-100 border-yellow-500"; // Elements being compared
    } else {
      return "bg-blue-100 border-blue-500"; // Default color
    }
  };

  // Create a style object for swapping animation
  const getSwapAnimationStyle = (isSwapping: boolean) => {
    if (!isSwapping) return {};

    return {
      animation: "swap-animation 0.8s ease-in-out", // Slowed down from 0.5s to 0.8s
      animationIterationCount: "1",
    };
  };

  return (
    <div className='relative p-8 border-b-2 border-gray-300 bg-white rounded-lg mb-4 shadow-inner'>
      {/* Add the keyframe animation definition */}
      <style>
        {`
          @keyframes swap-animation {
            0% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-10px) scale(1.05); }
            100% { transform: translateY(0) scale(1); }
          }
        `}
      </style>

      {/* Loop Variable Indicators - Now conditionally hidden */}
      {/* Removed loop variable indicators as requested */}

      {/* Bar Visualization */}
      <div className='flex items-end justify-center space-x-3 h-64 w-full'>
        {array.map((value, index) => {
          const height = `${Math.max((value / maxValue) * 90, 10)}%`;
          const barColorClasses = getBarColor(index);
          const isComparing = compareIndices.includes(index);
          const isSwapping = swapIndices.includes(index);

          return (
            <div
              key={`bar-${index}`}
              className={`relative flex flex-col items-center group transition-all duration-300`}
              style={{
                width: `${100 / array.length}%`,
                maxWidth: "80px",
                transformOrigin: "bottom center",
                zIndex: isSwapping || isComparing ? 10 : 5,
                ...getSwapAnimationStyle(isSwapping),
              }}
            >
              {/* Animated Bar */}
              <div
                className={`relative w-full ${barColorClasses.replace(
                  "border-",
                  ""
                )} transition-all duration-300 ease-in-out
                  rounded-t-md shadow-md
                  ${isComparing ? "ring-2 ring-yellow-300 ring-offset-2" : ""}`}
                style={{
                  height,
                }}
              />

              {/* Value box below bar - FIXED THE DOUBLE BORDER by moving the border to this element only */}
              <div
                className={`w-full py-2 px-1 text-center font-medium text-lg border-2 ${barColorClasses} rounded-md`}
              >
                {value}
              </div>

              {/* Comparison indicator */}
              {isComparing && (
                <div className='absolute -top-6 left-0 right-0 flex justify-center'>
                  <span className='animate-pulse bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded border border-yellow-300'>
                    Compare
                  </span>
                </div>
              )}

              {/* Swap indicator with arrow animation */}
              {isSwapping && (
                <div className='absolute -top-10 left-0 right-0 flex justify-center flex-col items-center'>
                  <div className='animate-bounce flex flex-col items-center'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='text-red-500'
                    >
                      <path
                        d='M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L13 16M17 20L21 16'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    <span className='bg-red-100 text-red-800 text-xs px-2 py-1 rounded border border-red-300 mt-1'>
                      Swap
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className='flex justify-center mt-6 space-x-4 text-sm'>
        <div className='flex items-center'>
          <div className='w-4 h-4 bg-blue-100 border border-blue-500 mr-2 rounded'></div>
          <span className='text-blue-700'>Unsorted</span>
        </div>
        <div className='flex items-center'>
          <div className='w-4 h-4 bg-yellow-100 border border-yellow-500 mr-2 rounded'></div>
          <span className='text-yellow-700'>Comparing</span>
        </div>
        <div className='flex items-center'>
          <div className='w-4 h-4 bg-red-100 border border-red-500 mr-2 rounded'></div>
          <span className='text-red-700'>Swapping</span>
        </div>
        <div className='flex items-center'>
          <div className='w-4 h-4 bg-green-100 border border-green-500 mr-2 rounded'></div>
          <span className='text-green-700'>Sorted</span>
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualization;
