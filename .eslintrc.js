const path = require('path');

module.exports = {
  extends: [require.resolve('@mkaradeniz/eslint-config-typescript-react')],
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
  },
};
