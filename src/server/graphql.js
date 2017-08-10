import Path from 'server/models/Path'
import Training from 'server/models/Training'
import Trainer from 'server/models/Trainer'
import TrainingSession from 'server/models/TrainingSession'
import { GraphQLDate } from 'graphql-iso-date'
import { makeExecutableSchema } from 'graphql-tools'
import graphqlFields from 'graphql-fields'

const resolvers = {
  Date: GraphQLDate,
}

export const schema = makeExecutableSchema({
  typeDefs: `
    scalar Date

    type Path {
      id: ID!
      title: String
      color: String
      icon: String
      trainings: [Training]
    }

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
      title: String
      abstract: String
      icon: String
      link: String
      duration: String
      intraPrice: Float
    }

    type Trainer {
      id: ID!
      slug: ID!
      fullName: String
      description: String
      cloudinary_id: String
      link: String
      trainings: [Training]
    }

    type TrainingSession {
      id: ID!
      start_date: Date
      end_date: Date
      location: TrainingLocation
      link: String
    }

    type Query {
      paths: [Path]
      trainings: [Training]
      training(slug: ID!): Training
      trainingSession(id: ID!): TrainingSession
      trainer(slug: ID!): Trainer
    }
  `,
  resolvers,
})

const eagerResolver = {
  paths(fields) {
    if (fields.trainings) {
      const trainingsEagerPath = eagerResolver.trainings(fields.trainings)

      return {
        path: `trainings(orderByRank)${trainingsEagerPath
          ? `.${trainingsEagerPath}`
          : ''}`,
        modifiers: {
          orderByRank(builder) {
            builder.orderBy('rank', 'asc')
          },
        },
      }
    }

    return null
  },
  trainings(fields) {
    if (fields.duration || fields.intraPrice) return 'courses'
    return null
  },
}

export const rootValue = {
  async paths(args, obj, context) {
    const eager = eagerResolver.paths(graphqlFields(context))
    const query = Path.query().orderBy('rank', 'asc')
    if (eager) return query.eager(eager.path, eager.modifiers)
    return query
  },
  async trainings() {
    return Training.query().orderBy('rank', 'asc')
  },
  async training({ slug }) {
    return Training.query().where({ slug }).first()
  },
  async trainingSession({ id }) {
    return TrainingSession.query().where({ id }).first()
  },
  async trainer({ slug }) {
    return Trainer.query().where({ slug }).first()
  },
}
