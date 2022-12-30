import { GraphQLScalarType, Kind } from 'graphql'

export const JsonScalar = new GraphQLScalarType({
  name: 'JSON',
  serialize: (value) => JSON.stringify(value),
  parseValue: (value) => {
    if (typeof value !== 'string') throw new Error('JsonScalar can only parse string values')
    return JSON.parse(value)
  },
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) throw new Error('JsonScalar can only parse string values')
    return JSON.parse(ast.value)
  },
})
