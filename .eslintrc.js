module.exports = {
  root: true,
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
  env: {
    jest: true,
    browser: true,
  },
  globals: {
    shallow: true,
  },
  rules: {
    'no-shadow': 'off',
    'no-nested-ternary': 'off',

    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',

    'import/prefer-default-export': 'off',

    'class-methods-use-this': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        // As configured in webpack and jest
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
}
