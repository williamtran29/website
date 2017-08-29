import { toIdValue } from 'react-apollo'

export const dataIdFromObject = ({ __typename, id, slug, url }) =>
  `${__typename}:${id || slug || url}`

export const customResolvers = {
  Query: {
    training: (_, { slug }) =>
      toIdValue(dataIdFromObject({ slug, __typename: 'Training' })),
  },
}
