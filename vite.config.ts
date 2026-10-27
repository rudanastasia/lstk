import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import pageData from './src/data/pages.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: '/lstk/',

  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),

      context(pagePath: string) {
        const normalizedPath = pagePath.replace(/\\/g, '/');

        const pageKey = Object.keys(pageData).find((key) => normalizedPath.endsWith(key));

        const isHomePage =
          normalizedPath.endsWith('/index.html') || normalizedPath.endsWith('/pages/project.html');

        return {
          base: '/lstk/',
          isInnerPage: !isHomePage,
          ...(pageKey ? pageData[pageKey] : {}),
        };
      },
    }),
  ],

  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),

        about: resolve(__dirname, 'pages/about.html'),
        blog: resolve(__dirname, 'pages/blog.html'),
        article: resolve(__dirname, 'pages/article.html'),
        contacts: resolve(__dirname, 'pages/contacts.html'),
        projects: resolve(__dirname, 'pages/projects.html'),
        project: resolve(__dirname, 'pages/project.html'),
        services: resolve(__dirname, 'pages/services.html'),
        reviews: resolve(__dirname, 'pages/reviews.html'),
      },
    },
  },
});
