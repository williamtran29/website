import { buildSchema } from 'graphql'

export const schema = buildSchema(`
  type Training {
    name: String
  }

  type Query {
    training(id: ID!): Training
  }
`)

export const rootValue = {
  training() {
    return { name: 'foo' }
  },
}
