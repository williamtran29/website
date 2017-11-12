import thunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { combineForms } from 'react-redux-form'

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

const preloadedState =
  typeof window === 'object' ? window.__PRELOADED_STATE__ : {}
if (typeof window === 'object') delete window.__PRELOADED_STATE__
/* eslint-enable no-underscore-dangle */

export default createStore(
  combineReducers({
    forms: combineForms(
      {
        contact: {
          name: '',
          company: '',
          email: '',
          phone: '',
          message: '',
        },
      },
      'forms',
    ),
  }),
  preloadedState,
  composeEnhancers(applyMiddleware(thunk)),
)
