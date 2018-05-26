import React from 'react'
import gql from 'fraql'
import styled, { css } from 'styled-components'
import { up } from 'smooth-ui'
import { getSessionSummary, sessionSummaryFragment } from 'shared/session'

const SessionCoverSummaryComponent = ({ session, ...props }) => (
  <div {...props}>{getSessionSummary(session)}</div>
)

const SessionCoverSummary = styled(SessionCoverSummaryComponent)`
  font-size: 24px;
  line-height: 28px;

  ${up(
    'md',
    css`
      font-size: 40px;
      line-height: 50px;
    `,
  )};
`

SessionCoverSummary.fragments = {
  session: gql`
    fragment _ on Session {
      ${sessionSummaryFragment}
    }
  `,
}

export default SessionCoverSummary
