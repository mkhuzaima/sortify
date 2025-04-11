import { useState } from 'react';
import { Player } from '@remotion/player';
import { sortingAlgorithms } from './algorithms';
import InputForm from './components/InputForm';
import SortingVisualization from './remotion/SortingVisualization';
import './App.css';

function App() {
  const [array, setArray] = useState<number[] | null>(null);
  const [steps, setSteps] = useState<any[] | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleFormSubmit = (array: number[], algorithmIndex: number) => {
    setIsGenerating(true);
    
    // Small delay to allow UI to update
    setTimeout(() => {
      const algorithm = sortingAlgorithms[algorithmIndex];
      const sortingSteps = algorithm.sort(array);
      
      setArray(array);
      setSteps(sortingSteps);
      setSelectedAlgorithm(algorithmIndex);
      setIsGenerating(false);
    }, 100);
  };

  // Calculate video duration based on steps
  const stepsPerSecond = 2;
  const durationInFrames = steps ? Math.max(steps.length * (60 / stepsPerSecond), 60) : 60;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Sortify</h1>
          <p className="text-lg text-gray-600">
            Visualize sorting algorithms step by step
          </p>
        </header>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Input Form Section */}
          <div className="w-full lg:w-1/3">
            <InputForm onSubmit={handleFormSubmit} />
          </div>
          
          {/* Visualization Section */}
          <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md p-6">
            {isGenerating ? (
              <div className="h-64 flex items-center justify-center">
                <p className="text-xl">Generating visualization...</p>
              </div>
            ) : steps && array && selectedAlgorithm !== null ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  {sortingAlgorithms[selectedAlgorithm].name} Visualization
                </h2>
                <p className="text-gray-600">
                  {sortingAlgorithms[selectedAlgorithm].description}
                </p>
                <div className="aspect-video overflow-hidden rounded-lg border border-gray-200">
                  <Player
                    component={SortingVisualization}
                    durationInFrames={durationInFrames}
                    fps={60}
                    compositionWidth={1280}
                    compositionHeight={720}
                    style={{
                      width: '100%',
                    }}
                    controls
                    loop
                    autoPlay
                    initiallyShowControls
                    inputProps={{
                      steps,
                      title: sortingAlgorithms[selectedAlgorithm].name,
                      stepsPerSecond,
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p className="text-xl text-gray-500">
                  Enter an array of numbers and select a sorting algorithm to visualize
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <footer className="mt-12 text-sm text-gray-500 text-center">
        <p>Sortify - An educational tool to visualize sorting algorithms</p>
        <p className="mt-1">Created with React, TypeScript, Tailwind CSS, and Remotion</p>
      </footer>
    </div>
  );
}

export default App;
