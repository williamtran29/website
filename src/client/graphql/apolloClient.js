import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { cacheRedirects, dataIdFromObject } from 'shared/apollo'

/* eslint-disable no-underscore-dangle */
export const createApolloClient = () =>
  new ApolloClient({
    link: new HttpLink({
      uri: '/graphql',
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache({
      cacheRedirects,
      dataIdFromObject,
    }).restore(window.__APOLLO_STATE__),
  })
/* eslint-enable no-underscore-dangle */
