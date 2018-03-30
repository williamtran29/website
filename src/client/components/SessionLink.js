import React from 'react'
import PropTypes from 'prop-types'
import omitProps from 'recompact/omitProps'
import styled, { css } from 'styled-components'
import { Link as RRLink } from 'react-router-dom'
import theme from 'client/style/legacyTheme'
import CustomPropTypes from 'shared/CustomPropTypes'
import { summarizeSession } from 'shared/session'

const Link = styled(omitProps('light')(RRLink))`
  display: block;
  font-weight: 300;
  color: #ccc;
  line-height: 22px;
  transition: color 300ms;
  margin-top: 20px;
  text-transform: uppercase;

  ${props =>
    props.light
      ? css`
          color: #ccc;

          &:hover {
            color: #fff;
          }
        `
      : css`
          color: #333;

          &:hover {
            color: ${theme.colors.primary};
          }
        `};
`

const Full = styled.div`
  font-weight: 700;
`

const SessionLink = ({ light, session }) => (
  <Link to={session.link} light={light}>
    {session.training.title}
    <br />
    {summarizeSession(session)}
    {!session.inStock ? <Full>Complet</Full> : null}
  </Link>
)

SessionLink.propTypes = {
  light: PropTypes.bool,
  session: PropTypes.shape({
    link: PropTypes.string.isRequired,
    startDate: CustomPropTypes.dateOrString.isRequired,
    endDate: CustomPropTypes.dateOrString.isRequired,
    training: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

SessionLink.defaultProps = {
  light: false,
}

export default SessionLink
