import path from 'path'
import fs from 'mz/fs'
import { ServerStyleSheet } from 'styled-components'
import React from 'react'
import { StaticRouter } from 'react-router'
import {
  ApolloClient,
  ApolloProvider,
  renderToStringWithData,
} from 'react-apollo'
import { createLocalInterface } from 'apollo-local-query'
import * as graphql from 'graphql'
import { schema, rootValue } from 'server/graphql'
import config from 'server/config'
import App from 'client/App'
import store from 'client/store'

const PUBLIC = path.join(__dirname, '../../public')
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

export default () => async ({ request, response }) => {
  const apolloClient = new ApolloClient({
    ssrMode: true,
    networkInterface: createLocalInterface(graphql, schema, {
      rootValue,
    }),
  })

  const context = {}
  const sheet = new ServerStyleSheet()
  const html = await renderToStringWithData(
    sheet.collectStyles(
      <ApolloProvider store={store} client={apolloClient}>
        <StaticRouter location={request.url} context={context}>
          <App />
        </StaticRouter>
      </ApolloProvider>,
    ),
  )

  const preloadedState = store.getState()
  preloadedState.apollo = apolloClient.getInitialState()

  if (context.url) {
    response.status = 301
    response.headers = { Location: context.url }
  } else {
    const assets = await getAssets()
    response.body = `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    ${sheet.getStyleTags()}
  </head>
  <body>
    <div id="main">${html}</div>
    <script>window.__PRELOADED_STATE__ = ${JSON.stringify(
      preloadedState,
    ).replace(/</g, '\\u003c')}</script>
    <script src="${assets.main.js}"></script>
  </body>
</html>
    `
  }
}
