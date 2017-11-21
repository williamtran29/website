import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const addLeadingZero = value => (value < 10 ? `0${value}` : value)
const getRemainingTime = date => -1 * moment().diff(date)

class Countdown extends React.Component {
  state = { remainingTime: getRemainingTime() }

  componentDidMount() {
    this.intervalId = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  tick() {
    this.setState({ remainingTime: -1 * moment().diff(this.props.date) })

    if (this.state.remainingTime <= 0) {
      clearInterval(this.intervalId)
    }
  }

  render() {
    const { remainingTime } = this.state
    if (remainingTime === 0) {
      return this.props.children({
        days: '-',
        hours: '-',
        minutes: '-',
        seconds: '-',
      })
    }

    const duration = moment.duration(remainingTime)
    const days = String(duration.get('days'))
    const hours = String(duration.get('hours'))
    const minutes = addLeadingZero(duration.get('minutes'))
    const seconds = addLeadingZero(duration.get('seconds'))

    return this.props.children({ days, hours, minutes, seconds })
  }
}

Countdown.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  children: PropTypes.func.isRequired,
}

export default Countdown
