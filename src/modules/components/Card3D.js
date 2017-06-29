import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import offset from 'dom-helpers/query/offset'

const CardContainer = styled.div`
  transform-style: preserve-3d;
  perspective: 1000px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;

  .anchor {
    display: block;
    text-decoration: none;
    position: relative;
    border-radius: 3px;
    transition: transform .4s cubic-bezier(0, 0, .2, 1),
      filter .15s cubic-bezier(0, 0, .2, 1);
    width: 100%;
    height: 100%;
    transform: scale(1) rotateY(1e-07deg) rotateX(0) rotateZ(0deg);
  }

  .background {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    border-radius: 3px;
    overflow: hidden;
    pointer-events: none;
    box-shadow: 0 10px 25px 0 rgba(50, 94, 128, .2);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .glare {
    content: "";
    display: block;
    position: absolute;
    mix-blend-mode: overlay;
    background-image: radial-gradient(
      ellipse closest-side,
      hsla(0, 0%, 100%, .45),
      hsla(0, 0%, 100%, 0)
    );
    bottom: 0;
    left: -50%;
    right: -50%;
    top: -50%;
    height: 125%;
    will-change: transform;
    transition: transform .4s cubic-bezier(0, 0, .2, 1);
    opacity: .999999;
    z-index: 3;
    transform: translate(1px, 0px);
  }

  .inner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }
`

class Card3D extends Component {
  static propTypes = {
    background: PropTypes.string.isRequired,
    children: PropTypes.node,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }

  state = {
    style: {},
    glareStyle: {},
  }

  handleMouseMove = event => {
    const elementOffset = offset(event.currentTarget)
    const w = elementOffset.width
    const h = elementOffset.height
    const sensitivity = 2000 / Math.max(w, h)
    const currentX = Math.round(event.pageX - elementOffset.left)
    const currentY = Math.round(event.pageY - elementOffset.top)
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
      style: {},
      glareStyle: {},
    })
  }

  render() {
    return (
      <CardContainer width={this.props.width} height={this.props.height}>
        <div
          className="anchor"
          style={this.state.style}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
        >
          <div
            className="background"
            style={{ backgroundImage: this.props.background }}
          >
            <div className="glare" style={this.state.glareStyle} />
          </div>
          <div className="inner">
            {this.props.children}
          </div>
        </div>
      </CardContainer>
    )
  }
}

export default Card3D
