/* eslint-disable no-underscore-dangle */
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import ReactGA from 'react-ga'
import RouteChangeHook from 'modules/components/RouteChangeHook'
import apolloClient from 'client/apolloClient'
import store from 'client/store'
import { loadComponents } from 'loadable-components'
import * as intercom from 'modules/intercom'
import App from 'client/App'

function onUpdate(location) {
  // Scroll top
  window.scrollTo(0, 0)

  // Google Analytics
  const page = `${location.pathname}${location.search}`
  ReactGA.set({ page })
  ReactGA.pageview(page)

  // Update Intercom
  intercom.update()
}

const render = Component => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <RouteChangeHook onUpdate={onUpdate}>
            <Component />
          </RouteChangeHook>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>,
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
