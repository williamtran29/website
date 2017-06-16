import { buildSchema } from 'graphql'
import Training from 'server/models/Training'

export const schema = buildSchema(`
  type Training {
    id: ID!
    abstract: String
    cloudinary_id: String
    description: String
    color: String
    outline: String
    price: Int
    duration: Int
    name: String
    slug: String
  }

  type Query {
    trainings: [Training]
    training(slug: String!): Training
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
