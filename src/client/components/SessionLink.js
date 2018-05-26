import React from 'react'
import gql from 'fraql'
import styled, { css } from 'styled-components'
import { th } from 'smooth-ui'
import { Link } from 'react-router-dom'
import { getSessionSummary, sessionSummaryFragment } from 'shared/session'

const Full = styled.div`
  font-weight: 700;
`

const SessionLinkComponent = ({ variant, session, ...props }) => (
  <Link to={session.link} {...props}>
    {session.training.title}
    <br />
    {getSessionSummary(session)}
    {!session.inStock && <Full>Complet</Full>}
  </Link>
)

const SessionLink = styled(SessionLinkComponent)`
  display: block;
  font-weight: 300;
  color: ${th('textColor')};
  line-height: 22px;
  transition: color 300ms;
  margin-top: 20px;
  text-transform: uppercase;

  &:hover {
    color: ${th('primary')};
  }

  ${props =>
    props.variant === 'light' &&
    css`
      color: ${th('gray400')};

      &:hover {
        color: ${th('white')};
      }
    `};
`

SessionLink.fragments = {
  session: gql`
    fragment SessionLink on Session {
      link
      inStock
      training {
        title
      }
      ${sessionSummaryFragment}
    }
  `,
}

export default SessionLink
