/* eslint-disable no-underscore-dangle */
import { toIdValue } from 'apollo-utilities'

export const dataIdFromObject = result => {
  if (result.__typename) {
    if (result.slug !== undefined) {
      return `${result.__typename}:${result.slug}`
    }
    if (result.id !== undefined) {
      return `${result.__typename}:${result.id}`
    }
    if (result._id !== undefined) {
      return `${result.__typename}:${result._id}`
    }
    if (result.url !== undefined) {
      return `${result.__typename}:${result.url}`
    }
  }
  return null
}

export const cacheRedirects = {
  Query: {
    session: (_, { id }) =>
      toIdValue(dataIdFromObject({ id, __typename: 'Session' })),
    article: (_, { slug }) =>
      toIdValue(dataIdFromObject({ slug, __typename: 'Article' })),
  },
}
