import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { cacheResolvers, dataIdFromObject } from 'modules/apollo'

/* eslint-disable no-underscore-dangle */
const client = new ApolloClient({
  link: new HttpLink({
    uri: '/graphql',
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache({
    cacheResolvers,
    dataIdFromObject,
  }).restore(window.__APOLLO_STATE__),
})
/* eslint-enable no-underscore-dangle */

export default client
