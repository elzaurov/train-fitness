module.exports = {
  root: true,
  parser: `@typescript-eslint/parser`,
  parserOptions: {
      project: `./tsconfig.json`,
  },
  rules: {
      'react/prop-types': 0,
      'react/jsx-filename-extension': 0,
      'react/state-in-constructor': 0,
      'global-require': 0,
      'import/no-named-as-default': 0,
      'import/no-default-export': 0,
      '@typescript-eslint/no-loop-func': 0,
      '@typescript-eslint/no-redeclare': 0,
      '@typescript-eslint/no-shadow': 0,
      '@typescript-eslint/object-curly-spacing': 0,
      '@typescript-eslint/no-use-before-define': 0,
      'import/prefer-default-export': 0,
      'react/jsx-props-no-spreading': 0,
      'react/destructuring-assignment': 0,
      'consistent-return': 0,
      '@typescript-eslint/no-unused-expressions': 0,
      'react/forbid-prop-types': 0,
      'guard-for-in': 0,
      'no-restricted-syntax': 0,
      'react/sort-comp': 0,
      'react-native/no-inline-styles': 0
  },
  extends: [
      '@react-native-community',
      'airbnb-typescript',
      'prettier',
      'prettier/@typescript-eslint',
      'prettier/react',
  ],
};

