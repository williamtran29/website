import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'style/theme'
import { LinkButton } from 'modules/components/Button'
import TrainingIcon from 'modules/components/TrainingIcon'
import { summarizeSession } from 'modules/sessionUtil'

const Container = styled.div`
  max-width: 330px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  display: flex;
  margin-bottom: 20px;
`

const Name = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-transform: uppercase;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 20px;
    line-height: 24px;
  }
`

const IconContainer = styled.div`
  flex-shrink: 0;
  width: 50px;
  height: 50px;

  @media (min-width: ${theme.medias.phablet}) {
    width: 60px;
    height: 60px;
  }
`

const HeaderText = styled.div`
  margin-left: 10px;
`

const DateLocation = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 26px;
    line-height: 32px;
  }
`

const Description = styled.p`
  font-size: 16px;
  line-height: 20px;
  margin: 20px 0 0;
  opacity: 0.7;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 18px;
    line-height: 22px;
  }
`

const SessionCard = ({ session }) => (
  <Container>
    <Header>
      <IconContainer>
        <TrainingIcon training={session.training} />
      </IconContainer>
      <HeaderText>
        <Name>{session.training.title}</Name>
        <DateLocation>{summarizeSession(session)}</DateLocation>
      </HeaderText>
    </Header>
    <div>
      <LinkButton small to={session.link}>
        S’inscrire
      </LinkButton>
    </div>
    <Description>{session.training.abstract}</Description>
  </Container>
)

SessionCard.propTypes = {
  session: PropTypes.shape({
    link: PropTypes.string.isRequired,
    startDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]).isRequired,
    endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
      .isRequired,
    training: PropTypes.shape({
      abstract: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default SessionCard
