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
import { loadComponents } from 'loadable-components'
import * as intercom from 'modules/intercom'

function onUpdate(location) {
  // Scroll top
  window.scrollTo(0, 0)

  // Google Analytics
  const page = `${location.pathname}${location.search}`
  ReactGA.set({ page })
  ReactGA.pageview(page)

  // Twitter tracker
  if (window.twq) window.twq('track', 'PageView')

  // Update Intercom
  intercom.update()
}

const App = require('client/App').default

const render = Component => {
  ReactDOM.hydrate(
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

loadComponents().then(() => {
  render(App)

  // Initialize GA
  ReactGA.initialize('UA-101358560-1')

  if (process.env.NODE_ENV !== 'production') {
    ReactGA.ga('set', 'sendHitTask', null)
  }

  // First pageview of GA
  ReactGA.pageview(`${window.location.pathname}${window.location.search}`)

  // Initialize Intercom
  intercom.initialize()
  setTimeout(() => window.Intercom('boot', { app_id: 'ur91us5p' }), 2000)
})

if (module.hot) {
  module.hot.accept('./App', () => {
    render(require('./App').default) // eslint-disable-line global-require
  })
}
