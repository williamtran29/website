import Training from 'server/models/Training'
import Trainer from 'server/models/Trainer'
import TrainingSession from 'server/models/TrainingSession'
import Testimonial from 'server/models/Testimonial'
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date'
import { makeExecutableSchema } from 'graphql-tools'
import graphqlFields from 'graphql-fields'
import { graphql } from 'graphql'
import * as ghostApi from 'server/ghost/ghostApi'
import { eagerResolvers, enhanceQuery } from 'server/graphql/queryBuilder'

const resolvers = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
}

export const schema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    scalar Date
    scalar DateTime

    type Course {
      title: String
      content: String
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
      id: ID!
      slug: String!
      updatedAt: DateTime
      title: String!
      abstract: String!
      socialTitle: String!
      socialAbstract: String!
      icon: String!
      link: String!
      printLink: String!
      price: Int!
      objectives: String!
      prerequisites: String!
      outline: String!
      color: String!
      duration: Int!
      pdf: String
      courses: [Course!]!
      trainers: [Trainer!]!
      sessions: [Session!]!
      nextSession: Session
    }

    type Trainer {
      id: ID!
      slug: String!
      fullName: String
      description: String
      picture: String
      link: String
      trainings: [Training]
      articles: [Article]
    }

    type Session {
      id: ID!
      updatedAt: DateTime
      validFrom: Date
      startDate: Date
      endDate: Date
      participants: Int
      inStock: Boolean
      location: Location
      link: String
      training: Training
      siblings: [Session]
    }

    type Image {
      url: String!
      width: Int
      height: Int
    }

    type Article {
      id: ID!
      slug: String!
      title: String
      html: String
      feature_image: Image
      custom_excerpt: String
      published_at: DateTime
      updated_at: DateTime
      author: Author
      tags: [Tag]
      meta_title: String
      meta_description: String
      og_image: String
      og_title: String
      og_description: String
      twitter_image: String
      twitter_title: String
      twitter_description: String
      link: String
    }

    type Author {
      slug: String!
      name: String
      profile_image: Image
      twitter: String
      link: String
      bio: String
    }

    type Tag {
      slug: String!
      name: String
    }

    type Company {
      id: ID!
      color: String
      name: String
      logo: String
    }

    type Testimonial {
      id: ID!
      name: String
      title: String
      avatar: String
      text: String
      featured: Boolean
      company: Company
    }

    type Pagination {
      page: Int!
      limit: Int!
      total: Int!
    }

    type Meta {
      pagination: Pagination!
    }

    type ArticlesResult {
      posts: [Article]!
      meta:  Meta!
    }

    type Query {
      training(slug: String!): Training
      session(id: ID!): Session
      trainer(slug: String!): Trainer

      sessions(trainingSlug: String): [Session!]!
      trainings: [Training!]!

      articles(limit: Int, page: Int): ArticlesResult!
      article(slug: String!): Article

      testimonials: [Testimonial!]!
    }
  `,
  resolvers,
})

export const rootValue = {
  async training({ slug }, obj, context) {
    return enhanceQuery(
      Training.query()
        .where({ 'trainings.slug': slug, 'trainings.live': true })
        .first(),
      eagerResolvers.trainings(graphqlFields(context)),
    )
  },
  async session({ id }, obj, context) {
    if (!Number.isInteger(Number(id))) return null
    const session = await enhanceQuery(
      TrainingSession.query()
        .where({ 'training_sessions.id': id })
        .first(),
      eagerResolvers.sessions(graphqlFields(context)),
    )

    if (!session || !session.training) return null
    return session
  },
  async trainer({ slug }, obj, context) {
    return enhanceQuery(
      Trainer.query()
        .where({ 'trainers.slug': slug })
        .first(),
      eagerResolvers.trainers(graphqlFields(context)),
    )
  },

  async trainings(args, obj, context) {
    return enhanceQuery(
      Training.query().where({ 'trainings.live': true }),
      eagerResolvers.trainings(graphqlFields(context)),
    )
  },

  // Sitemap
  async sessions({ trainingSlug }, obj, context) {
    let query = TrainingSession.query()
      .joinRelation('training')
      .whereRaw("training_sessions.start_date > now() + interval '1 day'")
      .orderBy('training_sessions.start_date', 'asc')

    if (trainingSlug) {
      query = query.where('training.slug', trainingSlug)
    }

    return enhanceQuery(query, eagerResolvers.sessions(graphqlFields(context)))
  },

  // Testimonials
  async testimonials(args, obj, context) {
    return enhanceQuery(
      Testimonial.query().orderBy('testimonials.rank', 'asc'),
      eagerResolvers.testimonials(graphqlFields(context)),
    )
  },

  // Blog
  async articles({ limit, page }) {
    return ghostApi.getPosts({
      status: 'published',
      include: 'author,tags',
      limit,
      page,
    })
  },
  async article({ slug }) {
    return ghostApi.getPost(slug, { include: 'author,tags' })
  },
}

export const run = async query => {
  const { data, errors } = await graphql(schema, query, rootValue)
  if (errors && errors.length) {
    /* eslint-disable no-console */
    console.error(errors)
    /* eslint-enable no-console */
    throw new Error('Error during GraphQL request')
  }
  return data
}
