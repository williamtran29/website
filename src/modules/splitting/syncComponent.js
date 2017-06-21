/* eslint-disable no-underscore-dangle, no-param-reassign, react/forbid-prop-types */
import React from 'react'

const resolve = mod => (mod && mod.__esModule ? mod.default : mod)

function syncComponent(chunkName, mod) {
  const Component = resolve(mod)

  function SyncComponent(props) {
    const { staticContext } = props
    staticContext.splitPoints = staticContext.splitPoints || []

    if (!staticContext.splitPoints.includes(chunkName)) {
      props.staticContext.splitPoints.push(chunkName)
    }

    return <Component {...props} />
  }

  return SyncComponent
}

export default syncComponent
