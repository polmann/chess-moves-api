module.exports = {
  parser: 'babel-eslint',
  env: {
    jest: true,
  },
  plugins: ['babel'],
  extends: ['airbnb', 'prettier'],
  rules: {
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
  },
};
