/* eslint-disable no-underscore-dangle, react/sort-comp */
import React from 'react'

let id = 0
const components = {}

export async function loadSplits() {
  const ids = window.__SPLIT_STATE__ || []
  return Promise.all(ids.map(id => components[id].loadComponent()))
}

export function asyncComponent(getComponent) {
  class AsyncComponent extends React.Component {
    static Component = null
    static id = id

    static loadComponent() {
      // The function we call before rendering
      return getComponent().then(m => m.default).then(Component => {
        AsyncComponent.Component = Component
        return Component
      })
    }

    mounted = false

    state = {
      Component: AsyncComponent.Component,
    }

    componentWillMount() {
      if (this.state.Component === null) {
        AsyncComponent.loadComponent().then(Component => {
          if (this.mounted) {
            this.setState({ Component })
          }
        })
      }
    }

    componentDidMount() {
      this.mounted = true
    }

    componentWillUnmount() {
      this.mounted = false
    }

    render() {
      const { Component } = this.state

      if (Component !== null) {
        return <Component {...this.props} />
      }
      return null // or <div /> with a loading spinner, etc..
    }
  }

  components[id] = AsyncComponent
  id += 1

  return AsyncComponent
}
