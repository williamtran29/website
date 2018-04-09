import { ApolloClient } from 'apollo-client'
import { SchemaLink } from 'apollo-link-schema'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { cacheRedirects, dataIdFromObject } from 'shared/apollo'
import { schema, rootValue } from './'

export const createApolloClient = () =>
  new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema, rootValue }),
    cache: new InMemoryCache({ cacheRedirects, dataIdFromObject }),
  })
