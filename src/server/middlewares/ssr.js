import { ServerStyleSheet } from 'styled-components'
import React from 'react'
import { renderToString, renderToNodeStream } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { getLoadableState } from 'loadable-components/server'
import { clearCache as clearRequireCache } from 'server/utils/require'
import config from 'server/config'
import Head from 'server/components/Head'
import Body from 'server/components/Body'
import { asyncMiddleware } from 'server/utils/express'
import { injectGlobalStyle } from 'client/style/global'
import { createApolloClient } from 'server/graphql/apolloClient'

injectGlobalStyle()

const ssr = asyncMiddleware(async (req, res) => {
  if (config.get('env') !== 'production') {
    clearRequireCache('client')
  }

  /* eslint-disable global-require */
  const App = require('client/App').default
  /* eslint-enable global-require */

  const apolloClient = createApolloClient()
  const routerContext = {}
  const helmetContext = {}

  const app = (
    <ApolloProvider client={apolloClient}>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={req.url} context={routerContext}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </ApolloProvider>
  )

  // Loadable components
  const loadableState = await getLoadableState(app)

  // Styled components
  const sheet = new ServerStyleSheet()
  const jsx = sheet.collectStyles(app)

  // Apollo
  await getDataFromTree(app)
  const apolloState = apolloClient.cache.extract()

  // Handle React router status
  if (routerContext.status) {
    res.status(routerContext.status)
  }

  // Handle React Router redirection
  if (routerContext.url) {
    const status = routerContext.status === 301 ? 301 : 302
    res.redirect(status, routerContext.url)
    return
  }

  const { helmet } = helmetContext
  const stream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx))

  const head = renderToString(<Head helmet={helmet} />)
  res.set('content-type', 'text/html')
  res.write(
    `<!DOCTYPE html><html ${helmet.htmlAttributes}><head>${head}</head><body ${
      helmet.bodyAttributes
    }><div id="main">`,
  )
  stream.pipe(res, { end: false })
  stream.on('end', () => {
    const body = renderToString(
      <Body
        assets={config.get('server.assets')}
        helmet={helmet}
        loadableState={loadableState}
        apolloState={apolloState}
      />,
    )
    res.end(`</div>${body}</body></html>`)
  })
})

export default ssr
