import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import $ from 'jquery'

const Container = styled.div`
  transform-style: preserve-3d;
  perspective: 1000px;
`

const Anchor = styled.div`
  display: block;
  text-decoration: none;
  position: relative;
  border-radius: 3px;
  margin: 20px;
  transition: transform .4s cubic-bezier(0,0,.2,1), filter .15s cubic-bezier(0,0,.2,1);
  width: 300px;
  height: 300px;
  transform: scale(1) rotateY(1e-07deg) rotateX(0) rotateZ(0deg);
`

const Background = styled.div`
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
  box-shadow: 0 10px 25px 0 rgba(50,94,128,.2);
  background-image: linear-gradient(0deg,#89899b,#b5b5c4);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const Glare = styled.div`
  content: "";
  display: block;
  position: absolute;
  mix-blend-mode: overlay;
  background-image: radial-gradient(ellipse closest-side,hsla(0,0%,100%,.45),hsla(0,0%,100%,0));
  bottom: 0;
  left: -50%;
  right: -50%;
  top: -50%;
  height: 125%;
  will-change: transform;
  transition: transform .4s cubic-bezier(0,0,.2,1);
  opacity: .999999;
  z-index: 3;
  transform: translate(1px, 0px);
`

const Inner = styled.div`
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
  bottom: 10%;
  display: flex;
  flex-direction: column;
  pointer-events: none;
`

class Card3D extends Component {
  static propTypes = {
    children: PropTypes.node,
    background: PropTypes.string.isRequired,
  }

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
      style: {},
      glareStyle: {},
    })
  }

  render() {
    return (
      <Container>
        <Anchor
          style={this.state.style}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
        >
          <Background
            style={{ backgroundImage: `url(${this.props.background})` }}
          >
            <Glare style={this.state.glareStyle} />
          </Background>
          <Inner>
            {this.props.children}
          </Inner>
        </Anchor>
      </Container>
    )
  }
}

export default Card3D
