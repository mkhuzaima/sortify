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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Generate Sorting Visualization</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="array-input" className="block text-sm font-medium text-gray-700 mb-1">
            Enter numbers (comma-separated):
          </label>
          <input
            id="array-input"
            type="text"
            value={arrayInput}
            onChange={(e) => setArrayInput(e.target.value)}
            placeholder="e.g., 5, 2, 9, 1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="algorithm" className="block text-sm font-medium text-gray-700 mb-1">
            Select sorting algorithm:
          </label>
          <select
            id="algorithm"
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortingAlgorithms.map((algo, index) => (
              <option key={algo.name} value={index}>
                {algo.name}
              </option>
            ))}
          </select>
        </div>
        
        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Generate Video
        </button>
      </form>
    </div>
  );
};

export default InputForm;