import {useCurrentFrame} from "remotion";
import {Step} from "../algorithms/types";
import ArrayVisualization from "../components/ArrayVisualization";

interface SortingVisualizationProps {
  steps: Step[];
  title: string;
  stepsPerSecond: number;
}

const SortingVisualization = ({
  steps,
  title,
  stepsPerSecond = 2,
}: SortingVisualizationProps) => {
  const frame = useCurrentFrame();
  // Calculate pause frames after swap operations
  const FRAMES_PER_STEP = 60 / stepsPerSecond;
  const PAUSE_FRAMES_AFTER_SWAP = Math.floor(FRAMES_PER_STEP * 0.3); // 30% of a step duration

  // Calculate the current step index accounting for pauses after swaps
  const calculateStepIndex = (frameCount: number) => {
    let remainingFrames = frameCount;
    let stepIndex = 0;

    while (stepIndex < steps.length && remainingFrames >= 0) {
      // Check if previous step was a swap that requires a pause
      const isAfterSwap = stepIndex > 0 && steps[stepIndex - 1].type === "swap";

      // If we're in a pause period after a swap, return the previous step
      if (isAfterSwap && remainingFrames < PAUSE_FRAMES_AFTER_SWAP) {
        return stepIndex - 1;
      }

      // Consume frames for this step (plus potential pause)
      const framesForThisStep =
        FRAMES_PER_STEP + (isAfterSwap ? PAUSE_FRAMES_AFTER_SWAP : 0);

      if (remainingFrames < framesForThisStep) {
        return stepIndex;
      }

      remainingFrames -= framesForThisStep;
      stepIndex++;
    }

    return Math.min(stepIndex, steps.length - 1);
  };

  const currentStepIndex = calculateStepIndex(frame);
  const currentStep = steps[currentStepIndex];

  const {type, indices, arrayState} = currentStep;

  // Track sorted indices as they accumulate
  const sortedIndices = steps
    .slice(0, currentStepIndex + 1)
    .filter((step) => step.type === "markSorted")
    .flatMap((step) => step.indices);

  // Determine which indices are being compared or swapped in the current step
  const compareIndices = type === "compare" ? indices : [];
  const swapIndices = type === "swap" ? indices : [];

  // Check if we're in a pause period after a swap
  const isInPausePeriod = () => {
    if (currentStepIndex === 0) return false;

    const prevStepIsSwap = steps[currentStepIndex - 1].type === "swap";
    if (!prevStepIsSwap) return false;

    let consumedFrames = 0;
    for (let i = 0; i < currentStepIndex; i++) {
      const stepIsAfterSwap = i > 0 && steps[i - 1].type === "swap";
      consumedFrames +=
        FRAMES_PER_STEP + (stepIsAfterSwap ? PAUSE_FRAMES_AFTER_SWAP : 0);
    }

    return frame - consumedFrames < PAUSE_FRAMES_AFTER_SWAP;
  };

  // Format the action text based on the current step type
  const getActionText = () => {
    // If we're in a pause period after a swap, show a message indicating we're pausing
    if (isInPausePeriod()) {
      return `✓ Completed swap of elements ${indices
        .map((i) => arrayState[i])
        .join(" and ")}`;
    }

    switch (type) {
      case "compare":
        return `🔍 Comparing elements ${indices
          .map((i) => arrayState[i])
          .join(" and ")}`;
      case "swap":
        return `🔄 Swapping elements ${indices
          .map((i) => arrayState[i])
          .join(" and ")}`;
      case "markSorted":
        return `✅ Marking element ${indices
          .map((i) => arrayState[i])
          .join(", ")} as sorted`;
      default:
        return "";
    }
  };

  return (
    <div className='w-full h-full bg-gradient-to-b from-blue-50 to-gray-100 p-8 flex flex-col'>
      <div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
        <h1 className='text-3xl font-bold text-center mb-2 text-blue-800'>
          {title} Visualization
        </h1>
        <p className='text-gray-600 text-center'>
          Step-by-step sorting process visualization
        </p>
      </div>

      <div className='flex-1 flex flex-col items-center justify-center'>
        <ArrayVisualization
          array={arrayState}
          compareIndices={compareIndices}
          swapIndices={type === "swap" && !isInPausePeriod() ? swapIndices : []}
          sortedIndices={sortedIndices}
        />

        <div className='flex items-center justify-between w-full mt-4 p-4 bg-white rounded-lg border border-gray-200 shadow-md'>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-2'>
              <span className='font-bold text-gray-700'>Algorithm:</span>
              <span className='text-blue-700'>{title}</span>
            </div>
            <div className='flex items-center space-x-2'>
              <span className='font-bold text-gray-700'>Step:</span>
              <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full border border-blue-200'>
                {currentStepIndex + 1} of {steps.length}
              </span>
            </div>
          </div>

          <div>
            <span
              className={`font-semibold px-3 py-1 rounded-full border
              ${
                isInPausePeriod()
                  ? "bg-blue-100 text-blue-800 border-blue-300"
                  : type === "compare"
                  ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                  : type === "swap"
                  ? "bg-red-100 text-red-800 border-red-300"
                  : "bg-green-100 text-green-800 border-green-300"
              }`}
            >
              {getActionText()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualization;
