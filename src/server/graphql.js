import { buildSchema } from 'graphql'
import Training from 'server/models/Training'

export const schema = buildSchema(`
  type Training {
    abstract: String
    cloudinary_id: String
    description: String
    duration: Int
    name: String
  }

  type Query {
    trainings: [Training]
    training(id: ID!): Training
  }
`)

export const rootValue = {
  async trainings() {
    return Training.query()
  },
  async training({ id }) {
    return Training.query().findById(id)
  },
}
