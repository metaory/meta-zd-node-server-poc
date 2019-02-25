module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  rules: {
    'no-empty-pattern': 'off',
    'quotes': ['error', 'single'],
    'semi': [2, 'never'],
    'no-console': 'off'
  },
  env: {
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2018
  }
}
