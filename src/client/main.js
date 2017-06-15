import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import ScrollToTop from 'modules/components/ScrollToTop'
import apolloClient from 'client/apolloClient'
import store from 'client/store'

const App = require('client/App').default

const render = Component => {
  ReactDOM.render(
    <ApolloProvider store={store} client={apolloClient}>
      <BrowserRouter>
        <ScrollToTop>
          <AppContainer>
            <Component />
          </AppContainer>
        </ScrollToTop>
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('main'),
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    render(require('./App').default) // eslint-disable-line global-require
  })
}
