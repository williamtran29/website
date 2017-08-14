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

    type Course {
      id: ID!
      title: String
      outline: String
      path: Path
    }

    type Location {
      id: ID!
      name: String
      address: String
      city: String
      zipcode: String
      country: String
    }

    type Training {
      slug: ID!
      title: String
      abstract: String
      icon: String
      link: String
      duration: Int
      coursePrice: Int
      dayPrice: Int
      intraPrice: Int
      extraPrice: Int
      path: Path
      description: String
      objectives: String
      prerequisites: String
      courses: [Course]
      trainers: [Trainer]
      sessions: [Session]
    }

    type Trainer {
      slug: ID!
      fullName: String
      description: String
      picture: String
      link: String
      trainings: [Training]
    }

    type Session {
      id: ID!
      created_at: Date
      start_date: Date
      end_date: Date
      location: Location
      link: String
    }

    type Query {
      paths: [Path]
      trainings: [Training]
      training(slug: ID!): Training
      session(id: ID!): Session
      trainer(slug: ID!): Trainer
    }
  `,
  resolvers,
})

const eagerResolver = {
  paths(fields) {
    if (fields.trainings) {
      const trainingsEager = eagerResolver.trainings(fields.trainings)

      return {
        path: `trainings(orderByRank)${trainingsEager
          ? `.${trainingsEager.path}`
          : ''}`,
        modifiers: {
          orderByRank(builder) {
            builder.orderBy('trainings.rank', 'asc')
          },
          ...(trainingsEager ? trainingsEager.modifiers : {}),
        },
      }
    }

    return null
  },
  trainings(fields) {
    const paths = []
    const modifiers = {}
    if (fields.duration || fields.intraPrice || fields.extraPrice)
      paths.push('courses')
    if (fields.path) paths.push('path')
    if (fields.trainers) paths.push('trainers')
    if (fields.courses) {
      const coursesEager = eagerResolver.courses(fields.courses)
      paths.push(`courses${coursesEager ? `.${coursesEager.path}` : ''}`)
    }
    if (fields.sessions) {
      const sessionsEager = eagerResolver.sessions(fields.sessions)
      paths.push(
        `sessions(liveSessions)${sessionsEager
          ? `.${sessionsEager.path}`
          : ''}`,
      )
      modifiers.liveSessions = builder =>
        builder
          .whereRaw("training_sessions.start_date > now() + interval '1 day'")
          .orderBy('training_sessions.start_date', 'asc')
          .limit(3)
    }
    if (!paths.length) return null
    return { path: `[${paths.join(',')}]`, modifiers }
  },
  courses(fields) {
    const paths = []
    if (fields.path) paths.push('path')
    if (!paths.length) return null
    return { path: `[${paths.join(',')}]`, modifiers: {} }
  },
  sessions(fields) {
    const paths = []
    if (fields.location || fields.link) paths.push('location')
    if (fields.training || fields.link) paths.push('training')
    if (!paths.length) return null
    return { path: `[${paths.join(',')}]`, modifiers: {} }
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
  async training({ slug }, obj, context) {
    const eager = eagerResolver.trainings(graphqlFields(context))
    const query = Training.query().where({ 'trainings.slug': slug }).first()
    if (eager) return query.eager(eager.path, eager.modifiers)
    return query
  },
  async trainingSession({ id }) {
    return TrainingSession.query().where({ id }).first()
  },
  async trainer({ slug }) {
    return Trainer.query().where({ slug }).first()
  },
}
