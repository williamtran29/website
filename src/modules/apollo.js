import { toIdValue } from 'react-apollo'

export const dataIdFromObject = ({ __typename, id, slug, url }) =>
  `${__typename}:${slug || id || url}`

export const customResolvers = {
  Query: {
    training: (_, { slug }) =>
      toIdValue(dataIdFromObject({ slug, __typename: 'Training' })),
    article: (_, { slug }) =>
      toIdValue(dataIdFromObject({ slug, __typename: 'Article' })),
  },
}
