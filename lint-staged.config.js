module.exports = {
  concurrent: false,
  linters: {
    'src/**/*.{ts,tsx}': ['eslint --fix', 'yarn test:types', 'git add'],
  },
};
