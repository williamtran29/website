import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { customResolvers, dataIdFromObject } from 'modules/apollo'

/* eslint-disable no-underscore-dangle */
const client = new ApolloClient({
  initialState: typeof window === 'object' && {
    apollo: window.__PRELOADED_STATE__.apollo,
  },
  networkInterface: createNetworkInterface({
    uri: '/graphql',
    opts: {
      credentials: 'same-origin',
    },
  }),
  customResolvers,
  dataIdFromObject,
})
/* eslint-enable no-underscore-dangle */

export default client
