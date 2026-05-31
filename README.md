# C++ Terminal Showcase

Interactive C++ programs that run live in the browser — no installation, no backend, no compiler needed.

## How it works

Each project is real C++ source code interpreted in the browser via [JSCPP](https://github.com/felixhao28/JSCPP). The left pane shows the syntax-highlighted source; the right pane is a terminal where you provide stdin and see the output.

## Projects

| # | Title | Difficulty |
|---|-------|-----------|
| 1 | Bubble Sort | Beginner |
| 2 | Caesar Cipher | Beginner |
| 3 | Fibonacci | Beginner |
| 4 | GCD (Euclidean) | Beginner |
| 5 | Binary Search | Beginner |
| 6 | Prime Sieve | Beginner |
| 7 | Statistics | Beginner–Intermediate |
| 8 | Matrix Multiply | Intermediate |
| 9 | Quick Sort | Intermediate |
| 10 | Tower of Hanoi | Intermediate |
| 11 | Dijkstra's Algorithm | Hard |
| 12 | 0/1 Knapsack | Hard |
| 13 | LCS | Hard |

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Building for production

```bash
npm run build
```

Output goes to `dist/` — deploy to any static host (Vercel, GitHub Pages, Netlify).

## Stack

- [Vite](https://vitejs.dev/) — build tool
- [JSCPP](https://github.com/felixhao28/JSCPP) — C++ interpreter in JavaScript
- [highlight.js](https://highlightjs.org/) — syntax highlighting (Monokai theme)
