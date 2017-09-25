import React from 'react'
import { Redirect } from 'react-router'

const redirectIfNotFound = ({
  key,
  to,
  dataKey = 'data',
}) => Component => props => {
  if (props[dataKey].loading === false && props[dataKey][key] === null) {
    return <Redirect to={to} />
  }
  return <Component {...props} />
}

export default redirectIfNotFound
