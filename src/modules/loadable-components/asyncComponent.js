/* eslint-disable react/sort-comp */
import React from 'react'
import { LOADABLE } from './constants'
import { trackComponent } from './componentTracker'

function asyncComponent(getComponent) {
  class AsyncComponent extends React.Component {
    static Component = null

    static async load() {
      const module = await getComponent()
      const Component = module.default
      AsyncComponent.Component = Component
      return Component
    }

    state = {
      Component: AsyncComponent.Component,
      error: null,
    }

    unmounted = false

    componentWillMount() {
      if (this.state.Component !== null) return

      AsyncComponent.load()
        .then(Component => {
          this.safeSetState({ Component })
        })
        .catch(error => {
          this.safeSetState({ error })
        })
    }

    componentWillUnmount() {
      this.unmounted = true
    }

    safeSetState(state) {
      if (this.unmounted) return
      this.setState(state)
    }

    render() {
      const { Component } = this.state

      if (Component !== null) {
        return <Component {...this.props} />
      }

      return null
    }
  }

  const id = trackComponent(AsyncComponent)
  AsyncComponent[LOADABLE] = () => AsyncComponent
  AsyncComponent.componentId = id

  return AsyncComponent
}

export default asyncComponent
