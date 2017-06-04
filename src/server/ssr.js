import path from 'path'
import fs from 'mz/fs'
import { ServerStyleSheet } from 'styled-components'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Helmet } from 'react-helmet'
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
import Html from 'server/Html'
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

  const state = store.getState()
  state.apollo = apolloClient.getInitialState()

  const helmet = Helmet.renderStatic()

  if (context.url) {
    response.status = 301
    response.headers = { Location: context.url }
  } else {
    const assets = await getAssets()
    response.body = `<!DOCTYPE html>${renderToString(
      <Html
        assets={assets}
        content={html}
        helmet={helmet}
        sheet={sheet}
        state={state}
      />,
    )}`
  }
}
