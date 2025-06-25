// eslint.config.mjs
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // Disable the 'no-explicit-any' rule
      '@typescript-eslint/no-explicit-any': 'off',

      // Downgrade 'prefer-const' from error to warning (optional)
      'prefer-const': 'warn',
    },
  },
];
