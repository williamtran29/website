import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import theme from 'style/theme'
import SessionLink from 'modules/components/SessionLink'
import SessionCard from 'modules/components/SessionCard'
import { sessionCardFragment } from 'modules/queries'
import { distinctSessions } from 'modules/sessionUtil'
import JsonLd from 'modules/components/JsonLd'
import { sessionLd, sessionLdFragment } from 'client/linkedData'
import HomeWrapper from './HomeWrapper'
import HomeSectionTitle from './HomeSectionTitle'
import HomeContainer from './HomeContainer'

const Container = HomeContainer.extend`
  background-color: #252525;
  color: #fff;
  padding: 40px 20px 30px;
  display: block;

  @media (min-width: ${theme.medias.phablet}) {
    padding: 60px 20px 80px;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;
  }
`

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 40px;
  max-width: 760px;

  > * {
    margin-bottom: 70px;
  }

  @media (min-width: ${theme.medias.phablet}) {
    margin-left: 30px;
    margin-right: 40px;
    flex-direction: row;
  }
`

const Coming = styled.div`
  flex-shrink: 0;
  text-transform: uppercase;
  font-size: 18px;

  @media (min-width: ${theme.medias.phablet}) {
    padding-left: 20px;
    border-left: 1px solid #444;
  }
`

const ComingTitle = styled.div`
  font-weight: 700;
  line-height: 24px;
`

const QUERY = gql`
  query {
    sessions {
      ... SessionCard
      ... SessionLd
    }
  }

  ${sessionCardFragment}
  ${sessionLdFragment}
`

const HomeWorkshops = ({ sessions, headSessions }) => (
  <Container id="workshops">
    <HomeWrapper>
      <HomeSectionTitle>Formations</HomeSectionTitle>
      <Content>
        <div>
          <Cards>
            {headSessions.map(session => (
              <SessionCard key={session.id} session={session} />
            ))}
          </Cards>
        </div>
        <Coming>
          <ComingTitle>Toutes les dates</ComingTitle>
          {sessions.map(session => (
            <SessionLink key={session.id} light session={session} />
          ))}
        </Coming>
      </Content>
      {headSessions.map(session => (
        <JsonLd key={session.id}>{sessionLd(session)}</JsonLd>
      ))}
    </HomeWrapper>
  </Container>
)

export default graphql(QUERY, {
  props: ({ data }) => ({
    sessions: data.sessions || [],
    headSessions: data.sessions
      ? data.sessions && distinctSessions(data.sessions).slice(0, 4)
      : [],
  }),
})(HomeWorkshops)
