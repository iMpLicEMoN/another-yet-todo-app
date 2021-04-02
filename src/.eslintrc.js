module.exports = {
  'plugins': [
    'react'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'quotes': ['error', 'single'],
    'indent': ['error', 2],
    'comma-dangle': ['error', 'only-multiline'],
    'semi': ['error', 'always'],
  }
};