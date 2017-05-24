import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { rehydrate } from 'glamor'

if (typeof window !== 'undefined') {
  rehydrate(window._glam) // eslint-disable-line no-underscore-dangle
}

const App = require('client/App').default

const render = (Component) => {
  ReactDOM.render(
    <BrowserRouter>
      <AppContainer>
        <Component />
      </AppContainer>
    </BrowserRouter>,
    document.getElementById('main'),
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    render(require('./App').default) // eslint-disable-line global-require
  })
}
