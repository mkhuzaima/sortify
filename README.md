# Sortify 🔄

Sortify is an educational web application that helps users visualize and understand common sorting algorithms through interactive animations and step-by-step visualization.

![Sortify Banner](https://via.placeholder.com/800x400?text=Sortify+-+Sorting+Algorithm+Visualizer)

## 🎯 Overview

Sortify takes a list of numbers and a selected sorting algorithm, then generates an animated visualization that shows the sorting process step by step. This makes it easier to understand how different sorting algorithms work and compare their efficiencies.

## ✨ Features Implemented

- **Interactive Input**

  - Enter your own array of integers to sort
  - Support for different input formats and validation
  - Quick-access example datasets

- **Multiple Sorting Algorithms**

  - Bubble Sort
  - Selection Sort

- **Real-time Visualization**

  - Color-coded elements (comparing, swapping, sorted)
  - Animated transitions between steps
  - Pause after swap operations for better comprehension

- **Educational Elements**

  - Algorithm complexity information
  - Step-by-step breakdown of operations
  - Clear visual indicators for each operation type

- **Customization Options**
  - Adjustable animation speed (from very slow to very fast)
  - Descriptive algorithm information

## 🛠️ Technologies Used

- **React**: Front-end library for building the user interface
- **TypeScript**: For type-safe code and better developer experience
- **Tailwind CSS**: For styling the application
- **Remotion**: For creating interactive visualizations
- **Vite**: For fast development and optimized builds

## 🧩 Project Structure

```
sortify/
├── src/
│   ├── components/       # UI Components (InputForm, ArrayVisualization)
│   ├── algorithms/       # Sorting algorithm implementations with step tracking
│   ├── remotion/         # Remotion visualization components
│   ├── utils/            # Helper functions (array parsing, validation)
│   └── App.tsx           # Main application component
```

## 🔍 How It Works

1. **Input Handling**: Users enter comma-separated integers and select a sorting algorithm
2. **Step Generation**: The selected algorithm processes the array and generates a sequence of steps
3. **Visualization**: Each step is visualized with appropriate animations and color coding
4. **Education**: The UI provides information about the algorithm and tracking of operations

## 🚀 Future Enhancements

- **More Sorting Algorithms**

  - Quick Sort
  - Merge Sort
  - Heap Sort
  - Insertion Sort

- **Advanced Visualization Options**

  - Split-screen algorithm comparisons
  - Performance metrics visualization
  - Custom array generation (random, nearly sorted, reversed)

- **Educational Features**

  - Code view alongside visualization
  - Line-by-line explanation of the algorithm
  - Interactive tutorials

- **User Experience**
  - Save and share visualizations
  - User accounts to track progress
  - Dark mode support

## 🏁 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mkhuzaima/sortify.git
   cd sortify
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 💻 Development

The application is built with a focus on educational value and visual clarity. Each sorting algorithm implementation includes detailed step tracking to create a comprehensive visualization.

## 📝 Note

**This entire project, including all code, configurations, documentation, commits, and commit messages, was developed using GitHub Copilot Agent mode via `prd.md` file. Not a single line of code was manually written by the developer. The project was built to explore the capabilities and power of GitHub Copilot, specifically in Agent mode. This demonstrates how AI tools like GitHub Copilot can significantly accelerate and enhance the development process even for educational tools that require complex visualizations and algorithm implementations.**

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

[mkhuzaima](https://github.com/mkhuzaima)
