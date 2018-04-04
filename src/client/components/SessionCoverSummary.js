import React from 'react'
import gql from 'graphql-tag'
import styled, { css } from 'styled-components'
import { upTo } from 'smooth-ui'
import { getSessionSummary, sessionSummaryFragment } from 'shared/session'

const SessionCoverSummaryComponent = ({ session, ...props }) => (
  <div {...props}>{getSessionSummary(session)}</div>
)

const SessionCoverSummary = styled(SessionCoverSummaryComponent)`
  font-size: 24px;
  line-height: 28px;

  ${upTo(
    'md',
    css`
      font-size: 40px;
      line-height: 50px;
    `,
  )};
`

export const sessionCoverSummaryFragment = gql`
  fragment SessionCoverSummary on Session {
    ...SessionSummary
  }

  ${sessionSummaryFragment}
`

export default SessionCoverSummary
