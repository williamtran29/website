import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap/js/src/collapse'
import 'client/scss/main.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import App from 'client/App'

const render = (Component) => {
  ReactDOM.render(
    <BrowserRouter>
      <AppContainer>
        <Component />
      </AppContainer>
    </BrowserRouter>
  , document.getElementById('main'))
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    render(require('./App').default) // eslint-disable-line global-require
  })
}
