import { ApolloClient, createNetworkInterface } from 'react-apollo'

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
})
/* eslint-enable no-underscore-dangle */

export default client
