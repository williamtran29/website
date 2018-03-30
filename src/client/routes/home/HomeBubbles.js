/* eslint-disable react/no-multi-comp, react/no-array-index-key, jsx-a11y/mouse-events-have-key-events, jsx-a11y/click-events-have-key-events */
import React from 'react'
import styled from 'styled-components'
import pure from 'recompact/pure'
import raf from 'raf'
import { cl } from 'shared/cloudinary'

const noop = () => {}

const SIZE_COEFF = 0.8
const ITEM_SIZE = 150
const CONTAINER_HEIGHT = 440 * SIZE_COEFF
const CONTAINER_WIDTH = 2330 * SIZE_COEFF
const X_SPEED = 0.4
const Y_SPEED = 0.05
const Y_SPEED_SCALE_COEFF = 0.05
const SPRITE_SIZE = 150
const NB_SPRITE_COLUMNS = 5
const MAX_VERTICAL_GAP = 10

const OPACITY_SPEED_MIN = 0.007
const OPACITY_SPEED_MAX = 0.01
const OPACITY_DELAY_MAX = 50
const OPACITY_DELAY_MIN = 0

const settings = [
  { scale: 0.6, x: 1134, y: 45 },
  { scale: 0.6, x: 1620, y: 271 },
  { scale: 0.6, x: 1761, y: 372 },
  // { scale: 0.6, x: 2499, y: 79 },
  // { scale: 0.6, x: 2704, y: 334 },
  { scale: 0.6, x: 2271, y: 356 },
  { scale: 0.6, x: 795, y: 226 },
  { scale: 0.6, x: 276, y: 256 },
  { scale: 0.6, x: 1210, y: 365 },
  { scale: 0.6, x: 444, y: 193 },
  // { scale: 0.6, x: 2545, y: 387 },
  { scale: 0.8, x: 1303, y: 193 },
  { scale: 0.8, x: 907, y: 88 },
  { scale: 0.8, x: 633, y: 320 },
  { scale: 0.8, x: 323, y: 60 },
  { scale: 0.8, x: 129, y: 357 },
  { scale: 0.8, x: 1440, y: 342 },
  { scale: 0.8, x: 1929, y: 293 },
  { scale: 0.8, x: 2135, y: 198 },
  // { scale: 0.8, x: 2276, y: 82 },
  // { scale: 0.8, x: 2654, y: 182 },
  // { scale: 0.8, x: 2783, y: 60 },
  { scale: 1, x: 1519, y: 118 },
  { scale: 1, x: 1071, y: 233 },
  { scale: 1, x: 1773, y: 148 },
  { scale: 1, x: 2098, y: 385 },
  // { scale: 1, x: 2423, y: 244 },
  { scale: 1, x: 901, y: 385 },
  { scale: 1, x: 624, y: 111 },
  { scale: 1, x: 75, y: 103 },
  { scale: 1, x: 413, y: 367 },
  // { scale: 1, x: 2895, y: 271 },
  { scale: 1, x: 1990, y: 75 },
]

const labels = [
  'Node.js',
  'Babel',
  'Jest',
  'Angular',
  'D3.js',
  'Yarn',
  'TypeScript',
  'npm',
  'React',
  'Vue.js',
  'GraphQL',
  'Heroku',
  'Webpack',
  'ESLint',
  'Electron',
  'Redux',
  'Sass',
  'Meteor',
  'Styled Components',
  'Atom',
  'Socket.io',
  'Prettier',
  'Lodash',
  'Git',
  'RxJS',
]

const BubblesContainer = styled.div`
  height: ${CONTAINER_HEIGHT}px;
  width: ${CONTAINER_WIDTH}px;
  top: 60px;
  left: 0;
  position: absolute;

  .bubble {
    border-radius: 50%;
    background-color: white;
    height: ${ITEM_SIZE}px;
    width: ${ITEM_SIZE}px;
    will-change: transform, opacity;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("${cl('technos_gighwg')}");
    background-size: 750px 750px;
    box-shadow: 0 15px 35px rgba(0,0,0,.1), 0 3px 10px rgba(0,0,0,.07);
    -webkit-tap-highlight-color: transparent;
  }
`

const Label = pure(styled.div`
  position: absolute;
  left: 50%;
  bottom: -40px;
  padding: 5px 12px;
  background: #fff;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
  border-radius: 50px;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transform: translate(-50%, ${props => (props.show ? 0 : -10)}px);
  opacity: ${props => (props.show ? 1 : 0)};
  will-change: opacity, transform;
  transition-property: opacity, transform;
  transition-duration: 0.25s;
  transition-timing-function: ease-out;
`)

class LabelledBubble extends React.Component {
  state = { showLabel: false }

  handleMouseOver = () => this.setState({ showLabel: true })
  handleMouseOut = () => this.setState({ showLabel: false })

  render() {
    const { x, y, scale, opacity } = this.props
    const style = {
      backgroundPosition: this.props.bgPosition,
      transform: `translate(${x}px, ${y}px) scale(${scale})`,
      opacity,
    }

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        className="bubble"
        onClick={noop}
        onMouseOut={this.handleMouseOut}
        onMouseOver={this.handleMouseOver}
        style={style}
      >
        <Label show={this.state.showLabel}>{this.props.label}</Label>
      </div>
    )
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

class AnimatedBubble extends React.PureComponent {
  state = { x: 0, y: 0, scale: 0, opacity: 0 }

  componentDidMount() {
    const { x, y, index, scale } = this.props
    this.ySpeed = Math.random() * 4
    this.initY = (y - 40) * 0.8 // Adjust y
    const bgPositionX = (index % NB_SPRITE_COLUMNS) * SPRITE_SIZE
    const bgPositionY = Math.floor(index / NB_SPRITE_COLUMNS) * SPRITE_SIZE
    this.bgPosition = `${-bgPositionX}px ${-bgPositionY}px`
    this.ySpeed = Math.random() * Y_SPEED + Y_SPEED_SCALE_COEFF * (1 - scale)
    this.opacitySpeed =
      Math.random() * (OPACITY_SPEED_MAX - OPACITY_SPEED_MIN) +
      OPACITY_SPEED_MIN
    this.opacityDelay =
      Math.floor(Math.random() * OPACITY_DELAY_MAX - OPACITY_DELAY_MIN) +
      OPACITY_DELAY_MIN
    this.setState({ x, y: this.initY, scale, opacity: 0 })
  }

  componentDidUpdate() {
    this.rafHandle = raf(this.animate)
  }

  componentWillUnmount() {
    raf.cancel(this.rafHandle)
  }

  animate = () =>
    this.setState(({ x, y, opacity }) => {
      const nextState = {}

      // Apply speeds
      nextState.x = x - X_SPEED
      nextState.y = y - this.ySpeed

      // Handle back
      if (nextState.x < -ITEM_SIZE) {
        nextState.x += CONTAINER_WIDTH
      }

      // Oscillate in y
      if (
        Math.abs(Math.abs(nextState.y) - Math.abs(this.initY)) >
        MAX_VERTICAL_GAP
      ) {
        this.ySpeed = -this.ySpeed
      }

      // Animate opacity
      if (this.opacityDelay === 0) {
        if (opacity < 1) {
          nextState.opacity = opacity + this.opacitySpeed
        } else {
          nextState.opacity = 1
        }
      } else {
        this.opacityDelay -= 1
      }

      return nextState
    })

  render() {
    if (this.state.x === 0 && this.state.y === 0) return null

    return (
      <LabelledBubble
        bgPosition={this.bgPosition}
        x={this.state.x}
        y={this.state.y}
        label={labels[this.props.index]}
        opacity={this.state.opacity}
        scale={this.state.scale}
      />
    )
  }
}

const indexes = Array.from(
  new Array(settings.length),
  (_, index) => index,
).sort(() => Math.ceil(0.5 - Math.random()))

const Bubbles = () => (
  <BubblesContainer>
    {settings.map(({ scale, x, y }, index) => (
      <AnimatedBubble
        key={indexes[index]}
        index={indexes[index]}
        scale={scale * SIZE_COEFF}
        x={x * SIZE_COEFF}
        y={y * SIZE_COEFF}
      />
    ))}
  </BubblesContainer>
)

export default Bubbles
