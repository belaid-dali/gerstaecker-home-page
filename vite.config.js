import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
	plugins: [
		tailwindcss(),
		createHtmlPlugin({
			pages: [
				{
					entry: '/src/main.js',
					filename: 'index.html',
					template: 'index.html',
				},
				{
					entry: '/src/main.js',
					filename: 'homepage/index.html',
					template: 'homepage/index.html',
				},
			],
		}),
	],
});
