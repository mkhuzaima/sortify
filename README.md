# Sortify 🔄

Sortify is an educational web application that helps users visualize and understand common sorting algorithms through interactive animations and video generation.

## 🎯 Overview

Sortify takes a list of numbers and a selected sorting algorithm, then generates an animated visualization that shows the sorting process step by step. This makes it easier to understand how different sorting algorithms work and compare their efficiencies.

## ✨ Features

- **Interactive Input**: Enter your own array of integers to sort
- **Multiple Algorithms**: Choose from different sorting algorithms:
  - Bubble Sort
  - Selection Sort
- **Real-time Visualization**: Watch the sorting process as it happens
- **Educational Context**: Learn about sorting algorithm complexities and behaviors
- **Remotion Integration**: Generate high-quality videos of the sorting process

## 📋 Requirements

- Node.js 14+
- npm or yarn package manager

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/sortify.git
   cd sortify
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 💻 Usage

1. Enter a comma-separated list of integers in the input field (e.g., `5, 2, 9, 1, 7`)
2. Select a sorting algorithm from the dropdown menu
3. Click "Generate Video" to start the visualization
4. Watch the animation and learn how the selected algorithm sorts the data

## 🧠 How It Works

Sortify uses a step-by-step approach to track and visualize sorting algorithms:

1. **Step Tracking**: Each sorting algorithm implementation tracks every comparison, swap, and "mark as sorted" operation
2. **Visual Representation**: Elements are represented as bars with heights proportional to their values
3. **Color Coding**:
   - Blue: Regular element
   - Yellow: Elements being compared
   - Red: Elements being swapped
   - Green: Elements that are in their final sorted position

## 🛠️ Technologies Used

- **React**: Front-end library for building the user interface
- **TypeScript**: For type-safe code and better developer experience
- **Tailwind CSS**: For styling the application
- **Remotion**: For creating video visualizations
- **Vite**: For fast development and optimized builds

## 🧩 Project Structure

```
sortify/
├── src/
│   ├── components/       # Input UI, Dropdown, Button
│   ├── algorithms/       # Sorting functions with step tracking
│   ├── remotion/         # Remotion video composition
│   ├── utils/            # Helpers: parse input, validate array
│   └── App.tsx           # Main page layout
```

## 🌟 Future Enhancements

- Add more sorting algorithms (Quick Sort, Merge Sort, etc.)
- Allow custom animation speed control
- Implement algorithm comparison mode
- Add step-by-step explanation of what's happening
- Enable social sharing of generated visualizations

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Sorting algorithms educational resources
- React and Remotion documentation
- The open-source community for inspiration
