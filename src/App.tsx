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

  // Calculate video duration based on steps with pauses after swaps
  const stepsPerSecond = 2;
  const framesPerStep = 60 / stepsPerSecond;
  const calculateDuration = () => {
    if (!steps) return 60; // Default minimum
    
    // Count how many swap operations there are (which will need pauses)
    const swapCount = steps.filter(step => step.type === 'swap').length;
    
    // Calculate total frames needed (regular steps + pause frames after swaps)
    const pauseFramesAfterSwap = Math.floor(framesPerStep * 0.3); // 30% of a step duration
    return Math.max(
      (steps.length * framesPerStep) + (swapCount * pauseFramesAfterSwap),
      60 // Ensure a minimum length
    );
  };
  
  const durationInFrames = calculateDuration();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Sortify
              </span>
              <div className="absolute -top-3 -right-8 text-2xl animate-bounce">🔄</div>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-lg mx-auto">
            An interactive visualization tool that helps you understand how sorting algorithms work step-by-step
          </p>
        </header>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form Section */}
          <div className="w-full lg:w-1/3">
            <InputForm onSubmit={handleFormSubmit} />
            
            {/* Algorithm Information */}
            {selectedAlgorithm !== null && (
              <div className="mt-6 bg-white rounded-lg shadow-md p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {sortingAlgorithms[selectedAlgorithm].name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {sortingAlgorithms[selectedAlgorithm].description}
                </p>
                <div className="bg-blue-50 rounded-md p-3 text-sm">
                  <p className="font-medium text-blue-800">Time Complexity:</p>
                  <p className="text-gray-700">
                    {sortingAlgorithms[selectedAlgorithm].name === 'Bubble Sort' ? 
                      'Average & Worst Case: O(n²) | Best Case: O(n)' :
                      'All Cases: O(n²)'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Visualization Section */}
          <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-6">
            {isGenerating ? (
              <div className="h-96 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
                <p className="text-xl text-gray-700">Generating visualization...</p>
                <p className="text-sm text-gray-500 mt-2">Processing algorithm steps</p>
              </div>
            ) : steps && array && selectedAlgorithm !== null ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <span className="mr-2">Visualization</span>
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {array.length} elements
                  </span>
                </h2>
                
                <div className="aspect-video overflow-hidden rounded-lg border border-gray-200 shadow-inner bg-gray-50">
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
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
                  <p className="font-medium text-gray-700">
                    Total steps: {steps.length} | Animation speed: {stepsPerSecond} steps/second
                  </p>
                  <p className="text-gray-600 mt-1">
                    Each step represents a key operation in the algorithm: comparing, swapping, or marking as sorted. 
                    Pauses are added after swaps for better comprehension.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-96 flex flex-col items-center justify-center text-center">
                <div className="text-6xl mb-6">🔍</div>
                <p className="text-xl text-gray-700 mb-2">
                  Ready to visualize sorting algorithms
                </p>
                <p className="text-gray-500 max-w-md">
                  Enter an array of numbers and select a sorting algorithm to see how it works step by step
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3 max-w-md">
                  <div className="bg-blue-50 px-3 py-2 rounded-full text-sm text-blue-700">Bubble Sort</div>
                  <div className="bg-purple-50 px-3 py-2 rounded-full text-sm text-purple-700">Selection Sort</div>
                  <div className="bg-green-50 px-3 py-2 rounded-full text-sm text-green-700">Step-by-step</div>
                  <div className="bg-amber-50 px-3 py-2 rounded-full text-sm text-amber-700">Animation</div>
                  <div className="bg-pink-50 px-3 py-2 rounded-full text-sm text-pink-700">Educational</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <footer className="mt-16 pb-8 text-sm text-gray-500 text-center">
        <p>Sortify - An educational tool to visualize sorting algorithms</p>
        <p className="mt-1">Created with React, TypeScript, Tailwind CSS, and Remotion</p>
        <p className="mt-2">
          Developed by <a href="https://github.com/mkhuzaima" className="text-blue-500 hover:text-blue-700 font-medium transition-colors" target="_blank" rel="noopener noreferrer">
            mkhuzaima
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
