import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: '/lstk/',

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
