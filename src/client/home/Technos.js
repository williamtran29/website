/* eslint-disable react/no-multi-comp, react/no-array-index-key */
import React from 'react'
import { Link } from 'react-router-dom'
import { lighten } from 'polished'
import styled from 'styled-components'
import pure from 'recompact/pure'
import raf from 'raf'
import theme from 'style/theme'
import MdArrowForward from 'react-icons/lib/md/arrow-forward'

const noop = () => {}

const ITEM_SIZE = 150
const CONTAINER_WIDTH = 2240
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
  // { scale: 0.6, x: 2271, y: 356 },
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
]

const Title = styled.h1`
  margin-top: 25px;
  font-size: 26px;
  line-height: 1.5;
  font-weight: lighter;
  text-align: center;
  font-weight: 300;
  margin: 0 10px 60px;
  @media (min-width: 700px) {
    font-size: 40px;
    margin-top: 70px;
  }
`

const Subtitle = styled.span`
  color: ${theme.colors.primary};
  @media (min-width: 700px) {
    display: block;
  }
`

const Container = styled.div`
  position: relative;
  overflow: hidden;
`

const Background = styled.div`
  position: absolute;
  left: 0;
  top: calc(50% + 180px);
  right: 0;
  transform: skewY(-12deg);
  pointer-events: none;
  z-index: -1;
`

const Stripe = styled.div`
  position: absolute;
  top: auto;
  left: 0;
  right: 0;
  height: 200px;
`

const Stripe0 = Stripe.extend`
  height: 5000px;
  bottom: 200px;
  background: linear-gradient(90deg, #f5ede4, #fff7f5);
`

const Stripe1 = Stripe.extend`
  bottom: 0;
  left: calc(50% + 220px);
  background: linear-gradient(90deg, #fdf7f4, #fcf3ef);
`

const Stripe2 = Stripe.extend`
  bottom: 200px;
  right: calc(50% - 220px);
  background: linear-gradient(90deg, #f0e3d6, #faeee7);
`

const Stripe3 = Stripe.extend`
  bottom: 600px;
  left: 10%;
  right: calc(50% - 300px);
  background: linear-gradient(90deg, #faf2ec, #f6ebe4);
`

const BubblesContainer = styled.div`
  height: 440px;
  width: ${CONTAINER_WIDTH}px;
  position: relative;
`

const Bubble = pure(styled.div`
  border-radius: 50%;
  background-color: white;
  height: ${ITEM_SIZE}px;
  width: ${ITEM_SIZE}px;
  will-change: transform, opacity;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(/images/technos.png);
  background-size: 750px 750px;
  background-position: ${props => props.bgPosition};
  box-shadow: 0 15px 35px rgba(0,0,0,.1), 0 3px 10px rgba(0,0,0,.07);
  -webkit-tap-highlight-color: transparent;
`)

const Label = pure(styled.div`
  z-index: 5;
  position: absolute;
  left: 50%;
  bottom: -40px;
  padding: 5px 12px;
  background: #fff;
  box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
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
  transition-property: opacity,transform;
  transition-duration: .25s;
  transition-timing-function: ease-out;
`)

const Banner = styled.div`
  font-size: 20px;
  line-height: 1.4;
  color: white;
  text-align: center;
  background: linear-gradient(30deg, ${theme.colors.primary}, ${lighten(
  0.1,
  theme.colors.primary,
)});
  text-transform: uppercase;
  font-size: 16px;
  padding: 20px 10px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;

    svg {
      margin-left: 10px;
      display: inline-block;
      will-change: transform;
      transition: 300ms transform;
    }

    &:hover {
      svg {
        transform: translateX(10px);
      }
    }
  }

  @media (min-width: 700px) {
    font-size: 20px;
    padding: 30px 10px;
  }
`

class LabelledBubble extends React.Component {
  state = { showLabel: false }

  handleMouseOver = () => this.setState({ showLabel: true })
  handleMouseOut = () => this.setState({ showLabel: false })

  render() {
    const { x, y, scale, opacity } = this.props
    const style = {
      transform: `translate(${x}px, ${y}px) scale(${scale})`,
      opacity,
    }

    return (
      <Bubble
        bgPosition={this.props.bgPosition}
        onClick={noop}
        onMouseOut={this.handleMouseOut}
        onMouseOver={this.handleMouseOver}
        style={style}
      >
        <Label show={this.state.showLabel}>
          {this.props.label}
        </Label>
      </Bubble>
    )
  }
}

class AnimatedBubble extends React.PureComponent {
  state = {
    x: 0,
    y: 0,
    opacity: 0,
    scale: 0,
  }

  componentDidMount() {
    const { x, y, index, scale } = this.props
    this.ySpeed = Math.random() * 4
    this.initY = (y - 40) * 0.8 // Adjust y
    const bgPositionX = index % NB_SPRITE_COLUMNS * SPRITE_SIZE
    const bgPositionY = Math.floor(index / NB_SPRITE_COLUMNS) * SPRITE_SIZE
    this.bgPosition = `${-bgPositionX}px ${-bgPositionY}px`
    this.ySpeed = Math.random() * Y_SPEED + Y_SPEED_SCALE_COEFF * (1 - scale)
    this.opacitySpeed =
      Math.random() * (OPACITY_SPEED_MAX - OPACITY_SPEED_MIN) +
      OPACITY_SPEED_MIN
    this.opacityDelay =
      Math.floor(Math.random() * OPACITY_DELAY_MAX - OPACITY_DELAY_MIN) +
      OPACITY_DELAY_MIN
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({ x, y: this.initY, scale })
    /* eslint-enable react/no-did-mount-set-state */
    raf(this.animate)
  }

  componentWillUnmount() {
    raf.cancel(this.animate)
  }

  animate = () => {
    const { x, y, opacity } = this.state
    const nextState = {}

    // Apply speeds
    nextState.x = x - X_SPEED
    nextState.y = y - this.ySpeed

    // Handle back
    if (nextState.x < -ITEM_SIZE) nextState.x += CONTAINER_WIDTH

    // Oscillate in y
    if (
      Math.abs(Math.abs(nextState.y) - Math.abs(this.initY)) > MAX_VERTICAL_GAP
    )
      this.ySpeed = -this.ySpeed

    // Animate opacity
    if (this.opacityDelay === 0) {
      if (opacity < 1) nextState.opacity = opacity + this.opacitySpeed
      else nextState.opacity = 1
    } else {
      this.opacityDelay -= 1
    }

    this.setState(nextState)
    raf(this.animate)
  }

  render() {
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

const Technos = () =>
  <Container>
    <Background>
      <Stripe0 />
      <Stripe1 />
      <Stripe2 />
      <Stripe3 />
    </Background>
    <BubblesContainer>
      {settings
        .sort(() => Math.ceil(0.5 - Math.random()))
        .map((props, index) =>
          <AnimatedBubble key={index} index={index} {...props} />,
        )}
    </BubblesContainer>
    <Title>
      Explorez les technologies d’aujourd’hui.{' '}
      <Subtitle>Nos formations couvrent tout l’écosystème JavaScript.</Subtitle>
    </Title>
    <Banner>
      <Link to="/trainings">
        Consulter notre catalogue<MdArrowForward />
      </Link>
    </Banner>
  </Container>

export default Technos
