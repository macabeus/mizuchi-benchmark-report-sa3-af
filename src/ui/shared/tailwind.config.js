import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    path.join(__dirname, '**/*.{js,ts,jsx,tsx}'),
    path.join(__dirname, '..', 'run-report', 'index.html'),
    path.join(__dirname, '..', 'run-report', '**/*.{js,ts,jsx,tsx}'),
    path.join(__dirname, '..', 'decomp-atlas', 'index.html'),
    path.join(__dirname, '..', 'decomp-atlas', '**/*.{js,ts,jsx,tsx}'),
    path.join(__dirname, '..', 'comparison', 'index.html'),
    path.join(__dirname, '..', 'comparison', '**/*.{js,ts,jsx,tsx}'),
    path.join(__dirname, '..', 'comparison-af', 'index.html'),
    path.join(__dirname, '..', 'comparison-af', '**/*.{js,ts,jsx,tsx}'),
    path.join(__dirname, '..', 'benchmark-index', 'index.html'),
    path.join(__dirname, '..', 'benchmark-index', '**/*.{js,ts,jsx,tsx}'),
    path.join(__dirname, '..', 'aggregated', 'index.html'),
    path.join(__dirname, '..', 'aggregated', '**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
