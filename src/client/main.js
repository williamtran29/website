/* eslint-disable no-underscore-dangle */
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import ReactGA from 'react-ga'
import RouteChangeHook from 'modules/components/RouteChangeHook'
import apolloClient from 'client/apolloClient'
import store from 'client/store'
import * as Routes from './Routes'

ReactGA.initialize('UA-101358560-1')

function onUpdate(location) {
  window.scrollTo(0, 0)
  const page = `${location.pathname}${location.search}`
  ReactGA.set({ page })
  ReactGA.pageview(page)
}

if (process.env.NODE_ENV !== 'production') {
  ReactGA.ga('set', 'sendHitTask', null)
}

const App = require('client/App').default

const render = Component => {
  ReactDOM.render(
    <ApolloProvider store={store} client={apolloClient}>
      <BrowserRouter>
        <RouteChangeHook onUpdate={onUpdate}>
          <AppContainer>
            <Component />
          </AppContainer>
        </RouteChangeHook>
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('main'),
  )
}

const splitPoints = window.__SPLIT_POINTS__ || []
Promise.all(splitPoints.map(chunk => Routes[chunk].loadComponent())).then(() =>
  render(App),
)

if (module.hot) {
  module.hot.accept('./App', () => {
    render(require('./App').default) // eslint-disable-line global-require
  })
}
