import React from 'react'
import styled, { css } from 'styled-components'
import { up } from 'smooth-ui'
import gql from 'fraql'
import { Link } from 'react-router-dom'
import { getSessionSummary, sessionSummaryFragment } from 'shared/session'
import Button from './Button'
import TrainingIcon from './TrainingIcon'

const Header = styled.header`
  display: flex;
  margin-bottom: 20px;
`

const Name = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-transform: uppercase;

  ${up(
    'md',
    css`
      font-size: 20px;
      line-height: 24px;
    `,
  )};
`

const Icon = styled.div`
  flex-shrink: 0;
  width: 50px;
  height: 50px;

  ${up(
    'md',
    css`
      width: 60px;
      height: 60px;
    `,
  )};
`

const HeaderInfos = styled.div`
  margin-left: 10px;
`

const DateLocation = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;

  ${up(
    'md',
    css`
      font-size: 26px;
      line-height: 32px;
    `,
  )};
`

const Description = styled.p`
  font-size: 16px;
  line-height: 20px;
  margin: 20px 0 0;
  opacity: 0.7;

  ${up(
    'md',
    css`
      font-size: 18px;
      line-height: 22px;
    `,
  )};
`

const SessionCardComponent = ({ session, ...props }) => (
  <Link to={session.training.link} {...props}>
    <Header>
      <Icon>
        <TrainingIcon training={session.training} />
      </Icon>
      <HeaderInfos>
        <Name>{session.training.title}</Name>
        <DateLocation>{getSessionSummary(session)}</DateLocation>
      </HeaderInfos>
    </Header>
    <div>
      <Button size="sm">Voir le programme</Button>
    </div>
    <Description>{session.training.abstract}</Description>
  </Link>
)

const SessionCard = styled(SessionCardComponent)`
  max-width: 330px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  margin: 0 20px;
`

SessionCard.fragments = {
  session: gql`
    fragment _ on Session {
      training {
        title
        abstract
        link
        ${TrainingIcon.fragments.training}
      }
      ${sessionSummaryFragment}
    }
  `,
}

export default SessionCard
