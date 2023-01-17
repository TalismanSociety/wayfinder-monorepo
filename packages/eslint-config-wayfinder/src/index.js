module.exports = {
  extends: ['eslint:recommended', 'react-app', 'react-app/jest', 'prettier'],
  rules: {
    'import/no-cycle': 'warn',
  },
}
