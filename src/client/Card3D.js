import React, { Component } from 'react'
import $ from 'jquery'

class Card3D extends Component {
  state = {
    style: {},
    glareStyle: {},
  }

  handleMouseMove = event => {
    const $card = $(event.currentTarget)
    const w = $card.innerWidth()
    const h = $card.innerHeight()
    const sensitivity = 2000 / Math.max(w, h)
    const currentX = Math.round(event.pageX - $card.offset().left)
    const currentY = Math.round(event.pageY - $card.offset().top)
    const cx = (w / 2 - currentX) / w * 2
    const cy = (h / 2 - currentY) / h * 2
    const rx = cy * sensitivity
    const ry = -cx * sensitivity
    const tx = cx * w / 5
    const ty = cy * h / 5

    this.setState({
      style: {
        transform: `scale(1.05) rotateY(${ry}deg) rotateX(${rx}deg) rotateZ(0deg)`,
      },
      glareStyle: {
        transform: `translate(${tx}px, ${ty}px)`,
      },
    })
  }

  handleMouseLeave = () => {
    this.setState({
      style: {
        transform: 'scale(1) rotateY(1e-07deg) rotateX(0) rotateZ(0deg)',
      },
      glareStyle: {
        transform: 'translate(1px, 0)',
      },
    })
  }

  render() {
    return (
      <div className="card-3d">
        <div
          className="card-3d-anchor"
          style={this.state.style}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
        >
          <div className="card-3d-background">
            <div className="card-3d-glare" style={this.state.glareStyle} />
          </div>
          <div className="card-3d-inner">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Card3D
