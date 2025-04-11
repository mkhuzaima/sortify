import { Composition } from 'remotion';
import { SortingAlgorithm, Step } from '../algorithms/types';
import SortingVisualization from './SortingVisualization';

interface SortingCompositionProps {
  algorithm: SortingAlgorithm;
  steps: Step[];
}

const SortingComposition = ({ algorithm, steps }: SortingCompositionProps) => {
  // Calculate video duration based on steps
  // We're showing 2 steps per second
  const stepsPerSecond = 2;
  const durationInFrames = Math.max(steps.length * (60 / stepsPerSecond), 60); // Ensure a minimum length
  
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