import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    tailwindcss({
      config: {
        content: ['./index.html', './homepage/index.html', './src/**/*.{js,jsx,ts,tsx}'],
        theme: {
          extend: {},
        },
        plugins: [],
      },
    }),
    createHtmlPlugin({
      pages: [
        {
          entry: '/src/main.js', // Entry point for the main app
          filename: 'index.html', // Main HTML file
          template: 'index.html', // Template for the main HTML file
        },
        {
          entry: '/src/main.js', // Entry point for the homepage (optional)
          filename: 'homepage/index.html', // Path to the homepage HTML file
          template: 'homepage/index.html', // Template for the homepage HTML file
        },
      ],
    }),
  ],
});