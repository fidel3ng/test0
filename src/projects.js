import bubbleSortCode from './cpp/bubble_sort.cpp?raw'
import caesarCode from './cpp/caesar_cipher.cpp?raw'
import primeCode from './cpp/prime_sieve.cpp?raw'
import matrixCode from './cpp/matrix_multiply.cpp?raw'
import statsCode from './cpp/statistics.cpp?raw'

export const projects = [
  {
    id: 'bubble-sort',
    title: 'Bubble Sort',
    subtitle: 'Sorting algorithm visualizer',
    description:
      'Enter an array and watch each pass bubble the largest element to its correct position — step by step.',
    icon: '↕',
    color: '#00ff88',
    code: bubbleSortCode,
    exampleInput: '6\n64 34 25 12 22 11',
    hint: 'Line 1: element count (2–10) · Line 2: integers separated by spaces',
  },
  {
    id: 'caesar-cipher',
    title: 'Caesar Cipher',
    subtitle: 'Classical shift encryption',
    description:
      'Shift every letter by a key and see the full character-by-character mapping plus the alphabet shift table.',
    icon: '⇌',
    color: '#58a6ff',
    code: caesarCode,
    exampleInput: 'Hello\n3',
    hint: 'Line 1: one word (no spaces) · Line 2: shift amount 1–25',
  },
  {
    id: 'prime-sieve',
    title: 'Prime Sieve',
    subtitle: 'Sieve of Eratosthenes',
    description:
      'Watch composite numbers get eliminated one prime at a time until only primes remain.',
    icon: '∼',
    color: '#ff9500',
    code: primeCode,
    exampleInput: '50',
    hint: 'One number: upper limit (max 100)',
  },
  {
    id: 'matrix-multiply',
    title: 'Matrix Multiply',
    subtitle: '2 × 2 linear algebra',
    description:
      'Multiply two 2×2 matrices and see each dot-product element expanded into its full sum.',
    icon: '⊗',
    color: '#bd93f9',
    code: matrixCode,
    exampleInput: '1 2\n3 4\n5 6\n7 8',
    hint: 'Enter Matrix A row 1, row 2 · then Matrix B row 1, row 2',
  },
  {
    id: 'statistics',
    title: 'Statistics',
    subtitle: 'Descriptive data analysis',
    description:
      'Feed in any dataset and get count, sum, min, max, mean, median, variance, std dev and a histogram.',
    icon: '⋯',
    color: '#ff6b6b',
    code: statsCode,
    exampleInput: '8\n12 7 3 14 6 11 5 8',
    hint: 'Line 1: count (2–20) · Line 2: space-separated numbers',
  },
]
