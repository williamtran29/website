import { buildSchema } from 'graphql'
import Training from 'server/models/Training'

export const schema = buildSchema(`
  type Training {
    id: ID!
    slug: ID!
    abstract: String
    cloudinary_id: String
    description: String
    color: String
    outline: String
    price: Int
    duration: Int
    name: String
    siblings: [Training]
  }

  type Query {
    trainings: [Training]
    training(slug: ID!): Training
  }
`)

export const rootValue = {
  async trainings() {
    return Training.query()
  },
  async training({ slug }) {
    return Training.query().where({ slug }).first()
  },
}
