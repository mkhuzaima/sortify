import { Composition } from 'remotion';
import { SortingAlgorithm, Step } from '../algorithms/types';
import SortingVisualization from './SortingVisualization';

interface SortingCompositionProps {
  algorithm: SortingAlgorithm;
  steps: Step[];
}

const SortingComposition = ({ algorithm, steps }: SortingCompositionProps) => {
  // Calculate video duration based on steps with pauses after swaps
  const stepsPerSecond = 2;
  const framesPerStep = 60 / stepsPerSecond;
  
  // Count how many swap operations there are (which will need pauses)
  const swapCount = steps.filter(step => step.type === 'swap').length;
  
  // Calculate total frames needed (regular steps + pause frames after swaps)
  const pauseFramesAfterSwap = Math.floor(framesPerStep * 0.3); // 30% of a step duration
  const durationInFrames = Math.max(
    (steps.length * framesPerStep) + (swapCount * pauseFramesAfterSwap),
    60 // Ensure a minimum length
  );
  
  return (
    <Composition
      id="SortingVisualization"
      component={() => <SortingVisualization steps={steps} title={algorithm.name} stepsPerSecond={stepsPerSecond} />}
      durationInFrames={durationInFrames}
      fps={60}
      width={1280}
      height={720}
      defaultProps={{
        steps,
        title: algorithm.name,
        stepsPerSecond
      }}
    />
  );
};

export default SortingComposition;