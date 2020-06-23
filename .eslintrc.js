module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    "no-console": process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-debugger": process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "quotes": 'off', // I like using double quotes so that I can use an apostrophe
    "import/prefer-default-export": 'off',
    "arrow-body-style": 'off',
    "prefer-promise-reject-errors": "off",
    "no-throw-literal": "off",
    "max-len": "off",
  },
};
