import React from 'react'
import theme from 'style/theme'
import { lighten } from 'polished'
import styled from 'styled-components'
import MainTitle from 'modules/components/MainTitle'
import FaRocket from 'react-icons/lib/fa/rocket'
import FaCodeFork from 'react-icons/lib/fa/code-fork'
import FaCloud from 'react-icons/lib/fa/cloud'
import SectionWrapper from 'client/home/SectionWrapper'

const Container = styled.div`
  text-align: center;
`

const Wrapper = SectionWrapper.extend`
  flex-direction: column;
`

const Content = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row-reverse;
  }
`

const List = styled.ul`
  margin: 0 20px;
  padding: 0;
  text-align: left;
  flex: 45;
  @media (min-width: ${theme.medias.phablet}) {
    margin: 0 0 0 40px;
  }
`

const Item = styled.li`
  font-size: 20px;
  font-weight: 300;
  line-height: 1.2;
  margin-bottom: 30px;
  display: flex;

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    fill: ${lighten(0.3, theme.colors.primary)};
    margin-right: 20px;
    width: 1.5em;
    height: 1.5em;
    flex-shrink: 0;
  }

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 26px;
    margin-bottom: 50px;
  }
`

const Screen = styled.div`
  flex: 55;
  width: 100%;
  height: 274px;
  position: relative;
  overflow: hidden;
  @media (min-width: ${theme.medias.phablet}) {
    height: 507px;
  }
`

const ScreenBackground = styled.div`
  position: absolute;
  background-image: url(//res.cloudinary.com/smooth/image/upload/q_auto/v1497506391/atom-editor_so5uom.png);
  background-size: 518px 214px;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 234px;
  margin: 20px 0;
  @media (min-width: ${theme.medias.phablet}) {
    position: absolute;
    border-radius: 4px;
    margin: 40px;
    box-shadow: 0px 5px 40px 0px rgba(0,0,0,0.5);
    background-size: 1036px 427px;
    width: 1036px;
    height: 427px;
  }
`

const Title = MainTitle.withComponent('h2').extend`
  margin-right: 10px;
  margin-top: 10px;
`

const Workshop = () =>
  <Container>
    <Wrapper>
      <Title>Plus qu’une formation, un vrai workshop.</Title>
      <Content>
        <Screen>
          <ScreenBackground />
        </Screen>
        <List>
          <Item>
            <FaRocket />
            Construisez un projet de zéro tout au long de la
            formation.
          </Item>
          <Item>
            <FaCodeFork />
            Avec git, pas de panique, passez à l’étape suivante quand vous le
            souhaitez !
          </Item>
          <Item>
            <FaCloud />
            Besoin de plus de temps ? Nos exercices sont accessibles en ligne !
          </Item>
        </List>
      </Content>
    </Wrapper>
  </Container>

export default Workshop
