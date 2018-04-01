import PropTypes from 'prop-types'

export default {
  dateOrString: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
}
