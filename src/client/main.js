/* eslint-disable no-underscore-dangle */
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ReactGA from 'react-ga'
import { loadComponents } from 'loadable-components'
import RouteChangeHook from 'client/components/RouteChangeHook'
import { createApolloClient } from 'client/graphql/apolloClient'
// import * as intercom from 'client/services/intercom'
import { injectGlobalStyle } from 'client/style/global'
import { configure as configureMoment } from 'shared/moment'
import App from './App'

configureMoment()
injectGlobalStyle()

function onUpdate(location) {
  // Scroll top
  window.scrollTo(0, 0)

  // Google Analytics
  const page = `${location.pathname}${location.search}`
  ReactGA.set({ page })
  ReactGA.pageview(page)

  // Update Intercom
  // intercom.update()
}

loadComponents().then(() => {
  ReactDOM.hydrate(
    <ApolloProvider client={createApolloClient()}>
      <HelmetProvider>
        <BrowserRouter>
          <RouteChangeHook onUpdate={onUpdate}>
            <App />
          </RouteChangeHook>
        </BrowserRouter>
      </HelmetProvider>
    </ApolloProvider>,
    document.getElementById('main'),
  )

  // Initialize GA
  ReactGA.initialize('UA-101358560-1')

  if (process.env.NODE_ENV !== 'production') {
    ReactGA.ga('set', 'sendHitTask', null)
  }

  // First pageview of GA
  ReactGA.pageview(`${window.location.pathname}${window.location.search}`)

  // Initialize Intercom
  // intercom.initialize()
  setTimeout(() => window.Intercom('boot', { app_id: 'ur91us5p' }), 2000)
})
