import { toIdValue } from 'react-apollo'

export const dataIdFromObject = ({ __typename, id, slug }) =>
  `${__typename}:${id || slug}`

export const customResolvers = {
  Query: {
    training: (_, { slug }) =>
      toIdValue(dataIdFromObject({ slug, __typename: 'Training' })),
  },
}
