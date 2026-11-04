/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  ignoreFiles: ['dist/**', 'node_modules/**'],
  rules: {
    'declaration-empty-line-before': null,
    'at-rule-empty-line-before': null,
    'scss/dollar-variable-pattern': null,
    // Разрешаем BEM: block__element--modifier
    'selector-class-pattern': [
      '^[a-z0-9]+(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$',
      { message: 'Имя класса должно быть в BEM-формате (block__element--modifier)' },
    ],
  },
};
