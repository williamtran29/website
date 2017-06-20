import { toIdValue } from 'react-apollo'

export const dataIdFromObject = ({ __typename, slug }) =>
  `${__typename}:${slug}`

export const customResolvers = {
  Query: {
    training: (_, { slug }) =>
      toIdValue(dataIdFromObject({ slug, __typename: 'Training' })),
  },
}
