## 🧾 Product Requirements Document – **Sortify**

### 📌 Project Overview

**Sortify** is a web app that takes a list of numbers and a selected sorting algorithm, then generates an animated video that visually explains the sorting process step by step using Remotion.

---

### 🎯 Objective

Create an educational video generator that visualizes how sorting algorithms work.

---

### 👥 Target Users

- Students learning sorting algorithms
- Teachers creating educational content
- Developers preparing for coding interviews

---

### 🛠️ Tech Stack

- **Frontend:** React (with Vite or Next.js)
- **Styling:** Tailwind CSS
- **Video Engine:** Remotion (React-based video rendering)
- **Language:** TypeScript

---

### ✅ Features

#### 1. Input Interface

- Input field for an array of numbers (e.g., `5, 2, 9, 1`)
- Dropdown to select one sorting algorithm:
  - Bubble Sort
  - Selection Sort
- "Generate Video" button

#### 2. Sorting Step Tracker

Each algorithm must track the sorting process as an ordered list of steps.
Each step should include:

```ts
type Step = {
  type: "compare" | "swap" | "markSorted";
  indices: number[];
  arrayState: number[];
};
```

#### 3. Visualization

- Use bars or boxes to represent numbers
- Animate:
  - **Comparisons** (highlighted)
  - **Swaps** (switch positions)
  - **Sorted** (change color when placed correctly)

#### 4. Video Output

- Render animated sorting video using Remotion
- Provide preview or download option

---

### 🧩 Folder Structure

```
sortify/
├── src/
│   ├── components/         # Input UI, Dropdown, Button
│   ├── algorithms/         # Sorting functions with step tracking
│   ├── remotion/           # Remotion video composition
│   ├── utils/              # Helpers: parse input, validate array
│   └── App.tsx             # Main page layout
```

---

### 🚀 Deliverables

- Fully working web app
- Functional input form
- Step-by-step animation for at least two algorithms
- Video preview/download feature

---

### 📌 Notes for Developer

- Keep UI simple and clean
- Focus on correct step generation and animation
- Hardcode reasonable animation speed
- Validate that the input is a list of integers
