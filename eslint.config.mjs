/*Команды для работы с проектом:
npm run lint — проверить весь проект на ошибки ESLint.
npm run lint: fix — автоматически исправить ошибки во всём проекте.
npm run format — отформатировать все файлы проекта.
npm run format: check — проверить, правильно ли отформатированы все файлы.*/

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: { globals: globals.browser },
  },
  eslintConfigPrettier, // Отключает конфликтующие с Prettier правила
  {
    rules: {
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
]);
