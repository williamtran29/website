import Training from 'server/models/Training'
import TrainingSession from 'server/models/TrainingSession'
import { GraphQLDate } from 'graphql-iso-date'
import { makeExecutableSchema } from 'graphql-tools'

const resolvers = {
  Date: GraphQLDate,
}

export const schema = makeExecutableSchema({
  typeDefs: `
    scalar Date

    type TrainingLocation {
      id: ID!
      name: String
      address: String
      city: String
      zipcode: String
      country: String
    }

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
      sessions: [TrainingSession]
    }

    type TrainingSession {
      id: ID!
      start_date: Date
      end_date: Date
      location: TrainingLocation
      link: String
    }

    type Query {
      trainings: [Training]
      training(slug: ID!): Training
      trainingSession(id: ID!): TrainingSession
    }
  `,
  resolvers,
})

export const rootValue = {
  async trainings() {
    return Training.query()
  },
  async training({ slug }) {
    return Training.query().where({ slug }).first()
  },
  async trainingSession({ id }) {
    return TrainingSession.query().where({ id }).first()
  },
}
