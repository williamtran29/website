import React from 'react'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { combineForms } from 'react-redux-form'
import { Provider } from 'react-redux'

/* eslint-disable no-underscore-dangle */
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose
/* eslint-enable no-underscore-dangle */

export const provideStore = Component => () => {
  const store = createStore(
    combineForms({
      contact: {
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
      },
    }),
    composeEnhancers(applyMiddleware(thunk)),
  )
  return <Provider store={store}><Component /></Provider>
}
