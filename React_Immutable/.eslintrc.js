module.exports = {
  env: {
    browser: false,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['jest'],
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: 'res|next|^err' }],
    'no-console': 'off',
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
  },
};
