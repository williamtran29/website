import path from 'path'
import fs from 'mz/fs'
import { ServerStyleSheet } from 'styled-components'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { cacheResolvers, dataIdFromObject } from 'modules/apollo'
import LocalLink from 'server/graphql/LocalLink'
import { schema, rootValue } from 'server/graphql'
import config from 'server/config'
import App from 'client/App'
import Html from 'server/middlewares/Html'
import store from 'client/store'
import { getLoadableState } from 'loadable-components/server'

const PUBLIC = path.join(__dirname, '../../../public')
const production = config.get('env') === 'production'

let assets
const getAssets = async () => {
  if (assets) return assets

  if (production) {
    const json = await fs.readFile(
      path.join(PUBLIC, 'dist/webpack-assets.json'),
      'utf-8',
    )
    assets = JSON.parse(json)
  } else {
    assets = { main: { js: '/dist/main.js' } }
  }

  return assets
}

export default () => async ctx => {
  const apolloClient = new ApolloClient({
    ssrMode: true,
    link: new LocalLink({ schema, rootValue }),
    cache: new InMemoryCache({
      cacheResolvers,
      dataIdFromObject,
    }),
  })
  const context = {}
  const sheet = new ServerStyleSheet()
  const app = sheet.collectStyles(
    <Provider store={store}>
      <ApolloProvider store={store} client={apolloClient}>
        <StaticRouter location={ctx.request.url} context={context}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    </Provider>,
  )

  if (context.status) ctx.status = context.status
  if (context.url) {
    ctx.status = 301
    ctx.redirect(context.url)
    return
  }

  const loadableState = await getLoadableState(app)
  await getDataFromTree(app)
  const html = renderToString(app)
  const state = store.getState()
  const apolloState = apolloClient.cache.extract()
  const helmet = Helmet.renderStatic()
  const assets = await getAssets()

  ctx.body = `<!DOCTYPE html>${renderToString(
    <Html
      assets={assets}
      content={html}
      helmet={helmet}
      loadableState={loadableState}
      apolloState={apolloState}
      sheet={sheet}
      state={state}
    />,
  )}`
}
