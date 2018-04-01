import React from 'react'
import styled from 'styled-components'
import theme from 'client/style/legacyTheme'
import ScrollLinkButton from 'client/components/ScrollLinkButton'
import HomeBubbles from './HomeBubbles'
import HomeWrapper from './HomeWrapper'

const Cover = styled.div`
  position: relative;
  background-color: #222;
  background-image: linear-gradient(180deg, #333 0%, #222 100%);
  height: 360px;
  overflow: hidden;

  @media (min-width: ${theme.medias.phablet}) {
    height: 430px;
  }
`

const Stripe = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  background: rgba(34, 34, 34, 0.95);

  @media (min-width: ${theme.medias.desktop}) {
    background: linear-gradient(
      125deg,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 41%,
      rgba(34, 34, 34, 0.95) 0,
      rgba(34, 34, 34, 0.95)
    );
  }
`

const Title = styled.h1`
  font-weight: 700;
  font-size: 40px;
  line-height: 50px;
  color: #fff;
  text-transform: uppercase;
  margin: 0 0 10px 0;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 70px;
    line-height: 80px;
  }
`

const Subtitle = styled.div`
  font-size: 22px;
  line-height: 26px;
  color: #fff;
  text-transform: uppercase;
  margin: 0 0 30px 0;
`

const Wrapper = HomeWrapper.extend`
  display: flex;
  justify-content: center;
  max-width: ${theme.medias.large};
  margin: 0 auto;
  padding: 0 20px;

  @media (min-width: ${theme.medias.desktop}) {
    justify-content: flex-end;
  }
`

const CoverText = styled.div`
  margin-top: 100px;
  z-index: 2;

  @media (min-width: ${theme.medias.desktop}) {
    width: 382px;
    margin-right: 150px;
  }
`

const HomeCover = () => (
  <Cover>
    <HomeBubbles />
    <Stripe />
    <Wrapper>
      <CoverText>
        <Title>
          Formations<br />
          JS & React
        </Title>
        <Subtitle>Formez-vous à l’excellence</Subtitle>
        <ScrollLinkButton to="workshops" spy smooth>
          Découvrir nos sessions
        </ScrollLinkButton>
      </CoverText>
    </Wrapper>
  </Cover>
)

export default HomeCover
