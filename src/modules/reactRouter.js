import React from 'react'
import { Route } from 'react-router-dom'

export const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      /* eslint-disable no-param-reassign */
      if (staticContext) staticContext.status = code
      /* eslint-enable no-param-reassign */
      return children
    }}
  />
)
