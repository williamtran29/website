import React from 'react'

class Toggler extends React.Component {
  state = { toggled: false }

  onToggle = () =>
    this.setState(previousState => ({ toggled: !previousState.toggled }))

  render() {
    return this.props.children({
      toggled: this.state.toggled,
      onToggle: this.onToggle,
    })
  }
}

export default Toggler
