import bubbleSortCode   from './cpp/bubble_sort.cpp?raw'
import caesarCode       from './cpp/caesar_cipher.cpp?raw'
import primeCode        from './cpp/prime_sieve.cpp?raw'
import matrixCode       from './cpp/matrix_multiply.cpp?raw'
import statsCode        from './cpp/statistics.cpp?raw'
import binaryCode       from './cpp/binary_search.cpp?raw'
import fibCode          from './cpp/fibonacci.cpp?raw'
import quickCode        from './cpp/quick_sort.cpp?raw'
import hanoiCode        from './cpp/tower_of_hanoi.cpp?raw'
import gcdCode          from './cpp/gcd_euclidean.cpp?raw'

export const projects = [
  {
    id: 'bubble-sort',
    title: 'Bubble Sort',
    subtitle: 'Sorting algorithm visualizer',
    difficulty: 'Beginner',
    description: 'Enter an array and watch each pass bubble the largest element to its correct position.',
    code: bubbleSortCode,
    exampleInput: '6\n64 34 25 12 22 11',
    hint: 'Line 1: element count (2–10) · Line 2: integers separated by spaces',
  },
  {
    id: 'caesar-cipher',
    title: 'Caesar Cipher',
    subtitle: 'Classical shift encryption',
    difficulty: 'Beginner',
    description: 'Shift every letter by a key and see the full character-by-character mapping.',
    code: caesarCode,
    exampleInput: 'Hello\n3',
    hint: 'Line 1: one word (no spaces) · Line 2: shift amount 1–25',
  },
  {
    id: 'fibonacci',
    title: 'Fibonacci',
    subtitle: 'Sequence with recurrence',
    difficulty: 'Beginner',
    description: 'Generate Fibonacci numbers and see each value built from the two before it.',
    code: fibCode,
    exampleInput: '12',
    hint: 'One number: how many terms to generate (1–40)',
  },
  {
    id: 'gcd-euclidean',
    title: 'GCD (Euclidean)',
    subtitle: 'Greatest common divisor',
    difficulty: 'Beginner',
    description: 'Step through Euclid\'s division algorithm to find GCD and LCM of two numbers.',
    code: gcdCode,
    exampleInput: '48 18',
    hint: 'Two positive integers on one line',
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    subtitle: 'Divide and conquer lookup',
    difficulty: 'Beginner',
    description: 'Watch the search interval halve at each step until the target is found.',
    code: binaryCode,
    exampleInput: '7\n2 5 8 12 16 23 38\n23',
    hint: 'Line 1: count · Line 2: sorted integers · Line 3: target value',
  },
  {
    id: 'prime-sieve',
    title: 'Prime Sieve',
    subtitle: 'Sieve of Eratosthenes',
    difficulty: 'Beginner',
    description: 'Watch composite numbers get eliminated one prime at a time until only primes remain.',
    code: primeCode,
    exampleInput: '50',
    hint: 'One number: upper limit (max 100)',
  },
  {
    id: 'statistics',
    title: 'Statistics',
    subtitle: 'Descriptive data analysis',
    difficulty: 'Beginner–Intermediate',
    description: 'Feed in any dataset and get count, sum, min, max, mean, median, std dev and a histogram.',
    code: statsCode,
    exampleInput: '8\n12 7 3 14 6 11 5 8',
    hint: 'Line 1: count (2–20) · Line 2: space-separated numbers',
  },
  {
    id: 'matrix-multiply',
    title: 'Matrix Multiply',
    subtitle: '2 × 2 linear algebra',
    difficulty: 'Intermediate',
    description: 'Multiply two 2×2 matrices and see each dot-product element expanded into its full sum.',
    code: matrixCode,
    exampleInput: '1 2\n3 4\n5 6\n7 8',
    hint: 'Enter Matrix A row 1, row 2 · then Matrix B row 1, row 2',
  },
  {
    id: 'quick-sort',
    title: 'Quick Sort',
    subtitle: 'Divide and conquer sorting',
    difficulty: 'Intermediate',
    description: 'See how a pivot partitions the array at each recursive step until everything is sorted.',
    code: quickCode,
    exampleInput: '7\n3 6 8 10 1 2 5',
    hint: 'Line 1: element count · Line 2: integers separated by spaces',
  },
  {
    id: 'tower-of-hanoi',
    title: 'Tower of Hanoi',
    subtitle: 'Classic recursion puzzle',
    difficulty: 'Intermediate',
    description: 'Watch every disk move as the recursive algorithm solves the puzzle step by step.',
    code: hanoiCode,
    exampleInput: '4',
    hint: 'One number: disk count (1–6)',
  },
]
