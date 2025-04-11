import { useState } from 'react';
import { parseArrayInput, validateArray } from '../utils/arrayUtils';
import { sortingAlgorithms } from '../algorithms';

interface InputFormProps {
  onSubmit: (array: number[], algorithmIndex: number) => void;
}

const InputForm = ({ onSubmit }: InputFormProps) => {
  const [arrayInput, setArrayInput] = useState<string>('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Predefined example arrays for users to try
  const examples = [
    "5, 2, 9, 1, 5, 6",
    "38, 27, 43, 3, 9, 82, 10",
    "15, 8, 5, 12, 10, 7, 3, 14"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const parsedArray = parseArrayInput(arrayInput);
    
    if (!validateArray(parsedArray)) {
      setError('Please enter a valid comma-separated list of at least two integers.');
      return;
    }
    
    setError(null);
    onSubmit(parsedArray!, selectedAlgorithm);
  };

  const setExample = (example: string) => {
    setArrayInput(example);
    setError(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <span className="mr-2">Generate Visualization</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="array-input" className="block text-sm font-medium text-gray-700 mb-1">
            Enter numbers (comma-separated):
          </label>
          <input
            id="array-input"
            type="text"
            value={arrayInput}
            onChange={(e) => {
              setArrayInput(e.target.value);
              setError(null);
            }}
            placeholder="e.g., 5, 2, 9, 1"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          
          <div className="mt-2">
            <p className="text-xs text-gray-500 mb-1">Try an example:</p>
            <div className="flex flex-wrap gap-2">
              {examples.map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setExample(example)}
                  className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                >
                  Example {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="algorithm" className="block text-sm font-medium text-gray-700 mb-1">
            Select sorting algorithm:
          </label>
          <div className="relative">
            <select
              id="algorithm"
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(Number(e.target.value))}
              className="w-full appearance-none px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
            >
              {sortingAlgorithms.map((algo, index) => (
                <option key={algo.name} value={index}>
                  {algo.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{error}</span>
          </div>
        )}
        
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Generate Visualization
        </button>
      </form>
      
      <div className="mt-5 pt-5 border-t border-gray-200 text-xs text-gray-500">
        <p>The visualization will show a step-by-step breakdown of how the selected sorting algorithm works on your input array.</p>
      </div>
    </div>
  );
};

export default InputForm;