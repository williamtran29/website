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
      longTitle: String
      abstract: String
      socialTitle: String
      socialAbstract: String
      socialPicture: String
      icon: String
      link: String
      duration: Int
      coursePrice: Int
      dayPrice: Int
      intraPrice: Int
      interPrice: Int
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
      title: String
      abstract: String
      humanizedPeriod: String
      validFrom: Date
      startDate: Date
      endDate: Date
      location: Location
      link: String
      training: Training
    }

    type Query {
      paths: [Path]
      trainings: [Training]
      training(slug: ID!): Training
      trainingSession(id: ID!): Session
      trainer(slug: ID!): Trainer
    }
  `,
  resolvers,
})

const normalizeQuery = pathOrQuery =>
  typeof pathOrQuery === 'string'
    ? {
        path: pathOrQuery,
        modifiers: {},
      }
    : pathOrQuery

class Eager {
  paths = []
  modifiers = {}

  add(pathOrQuery) {
    const query = normalizeQuery(pathOrQuery)
    this.paths = [...this.paths, query.path]
    this.modifiers = { ...this.modifiers, ...query.modifiers }
  }

  toQuery() {
    if (this.paths.length === 0) return null
    return {
      path: `[${this.paths.join(',')}]`,
      modifiers: this.modifiers,
    }
  }
}

const joinQuery = (source, join) => {
  const sourceQuery = normalizeQuery(source)
  const joinQuery = normalizeQuery(join)

  return {
    path: `${sourceQuery.path}${joinQuery ? `.${joinQuery.path}` : ''}`,
    modifiers: {
      ...sourceQuery.modifiers,
      ...(joinQuery ? joinQuery.modifiers : {}),
    },
  }
}

const eagerResolver = {
  paths(fields) {
    const eager = new Eager()
    if (fields.trainings)
      eager.add(
        joinQuery(
          {
            path: 'trainings',
            modifiers: {
              orderByRank(builder) {
                return builder.orderBy('trainings.rank', 'asc')
              },
            },
          },
          eagerResolver.trainings(fields.trainings),
        ),
      )

    return eager.toQuery()
  },
  trainings(fields) {
    const eager = new Eager()
    if (fields.path) eager.add('path')
    if (fields.trainers) eager.add('trainers')
    if (
      fields.courses ||
      fields.duration ||
      fields.intraPrice ||
      fields.interPrice
    )
      eager.add(
        joinQuery('courses', eagerResolver.courses(fields.courses || {})),
      )
    if (fields.sessions)
      eager.add(
        joinQuery(
          {
            path: 'sessions(liveSessions)',
            modifiers: {
              liveSessions(builder) {
                return builder
                  .whereRaw(
                    "training_sessions.start_date > now() + interval '1 day'",
                  )
                  .orderBy('training_sessions.start_date', 'asc')
                  .limit(3)
              },
            },
          },
          eagerResolver.sessions(fields.sessions),
        ),
      )
    return eager.toQuery()
  },
  courses(fields) {
    const eager = new Eager()
    if (fields.path) eager.add('path')
    return eager.toQuery()
  },
  sessions(fields) {
    const eager = new Eager()
    if (fields.location || fields.link) eager.add('location')
    if (fields.training || fields.link || fields.title || fields.abstract) {
      eager.add(
        joinQuery('training', eagerResolver.trainings(fields.training || {})),
      )
    }
    return eager.toQuery()
  },
  trainers(fields) {
    const eager = new Eager()
    if (fields.trainings)
      eager.add(
        joinQuery('trainings', eagerResolver.trainings(fields.trainings)),
      )
    return eager.toQuery()
  },
}

const enhanceQuery = (query, eagerQuery) => {
  if (eagerQuery) return query.eager(eagerQuery.path, eagerQuery.modifiers)
  return query
}

export const rootValue = {
  async paths(args, obj, context) {
    return enhanceQuery(
      Path.query().orderBy('paths.rank', 'asc'),
      eagerResolver.paths(graphqlFields(context)),
    )
  },
  async training({ slug }, obj, context) {
    return enhanceQuery(
      Training.query().where({ 'trainings.slug': slug }).first(),
      eagerResolver.trainings(graphqlFields(context)),
    )
  },
  async trainingSession({ id }, obj, context) {
    return enhanceQuery(
      TrainingSession.query().where({ 'training_sessions.id': id }).first(),
      eagerResolver.sessions(graphqlFields(context)),
    )
  },
  async trainer({ slug }, obj, context) {
    return enhanceQuery(
      Trainer.query().where({ 'trainers.slug': slug }).first(),
      eagerResolver.trainers(graphqlFields(context)),
    )
  },
}
