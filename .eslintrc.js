module.exports = {
  parser: '@typescript-eslint/parser', // if using TS
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // integrates Prettier with ESLint
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'jsx-quotes': ['error', 'prefer-single'],
    'prettier/prettier': ['error', { singleQuote: true, jsxSingleQuote: true }],
    indent: ['error', 4], // 4 spaces for indentation
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
