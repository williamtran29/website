import { ServerStyleSheet } from 'styled-components'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getLoadableState } from 'loadable-components/server'
import { cacheRedirects, dataIdFromObject } from 'shared/apollo'
import { clearCache as clearRequireCache } from 'server/utils/require'
import LocalLink from 'server/graphql/LocalLink'
import { schema, rootValue } from 'server/graphql'
import config from 'server/config'
import Html from 'server/components/Html'
import { asyncMiddleware } from 'server/utils/express'
import { injectGlobalStyle } from 'client/style/global'

injectGlobalStyle()

const ssr = asyncMiddleware(async (req, res) => {
  if (config.get('env') !== 'production') {
    clearRequireCache('client')
  }

  /* eslint-disable global-require */
  const App = require('client/App').default
  /* eslint-enable global-require */

  const apolloClient = new ApolloClient({
    ssrMode: true,
    link: new LocalLink({ schema, rootValue }),
    cache: new InMemoryCache({ cacheRedirects, dataIdFromObject }),
  })
  const routerContext = {}
  const sheet = new ServerStyleSheet()
  const app = sheet.collectStyles(
    <ApolloProvider client={apolloClient}>
      <StaticRouter location={req.url} context={routerContext}>
        <App />
      </StaticRouter>
    </ApolloProvider>,
  )

  const loadableState = await getLoadableState(app)
  await getDataFromTree(app)
  const html = renderToString(app)
  const apolloState = apolloClient.cache.extract()
  const helmet = Helmet.renderStatic()

  if (routerContext.status) {
    res.status(routerContext.status)
  }

  if (routerContext.url) {
    res.redirect(routerContext.url)
    return
  }

  res.send(
    `<!DOCTYPE html>${renderToString(
      <Html
        assets={config.get('server.assets')}
        content={html}
        helmet={helmet}
        loadableState={loadableState}
        apolloState={apolloState}
        sheet={sheet}
      />,
    )}`,
  )
})

export default ssr
