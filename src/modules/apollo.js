import { toIdValue } from 'react-apollo'

export const dataIdFromObject = ({ __typename, slug, id }) =>
  `${__typename}:${slug || id}`

export const customResolvers = {
  Query: {
    training: (_, { slug }) =>
      toIdValue(dataIdFromObject({ slug, __typename: 'Training' })),
  },
}
