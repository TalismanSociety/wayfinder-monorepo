const { resolve } = require('path')

const codegenOutputDir = `${resolve(__dirname, 'graphql-codegen')}/`
const config = {
  schema: process.env.REACT_APP_WAYFINDER_DATASOURCE || 'http://localhost:4350/graphql',
  documents: ['src/graphql.ts'],
  ignoreNoDocuments: true,
  generates: {
    [codegenOutputDir]: { preset: 'client', plugins: [] },
  },
}

module.exports = config
