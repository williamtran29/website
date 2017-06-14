import React from 'react'
import theme from 'style/theme'
import { lighten } from 'polished'
import styled from 'styled-components'
import H1 from 'modules/components/H1'
import FaRocket from 'react-icons/lib/fa/rocket'
import FaCodeFork from 'react-icons/lib/fa/code-fork'
import FaCloud from 'react-icons/lib/fa/cloud'

const Container = styled.div`
  text-align: center;
  margin: 70px 0;
  @media (min-width: 700px) {
    margin: 100px 0;
  }
`

const Content = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 700px) {
    margin-top: 50px;
    flex-direction: row-reverse;
  }
`

const List = styled.ul`
  margin: 0 20px;
  padding: 0;
  text-align: left;
  flex: 45;
`

const Item = styled.li`
  font-size: 20px;
  font-weight: 300;
  line-height: 1.2;
  margin-bottom: 30px;
  display: flex;

  &:last-child: {
    margin-bottom: 0;
  }

  svg {
    fill: ${lighten(0.3, theme.colors.primary)};
    margin-right: 20px;
    width: 1.5em;
    height: 1.5em;
    flex-shrink: 0;
  }

  @media (min-width: 700px) {
    font-size: 26px;
    margin-bottom: 50px;
  }
`

const Screen = styled.div`
  flex: 55;
  position: relative;
  height: 271px;
  width: 100%;
  overflow: hidden;
  @media (min-width: 700px) {
    height: 541px;
  }
`

const ScreenBackground = styled.div`
  position: absolute;
  top: 0;
  left: -50%;
  width: 633px;
  height: 271px;
  background-image: url(/images/atom-editor.png);
  background-size: 100%;
  @media (min-width: 700px) {
    left: 0;
    width: 1266px;
    height: 541px;
  }
`

const Title = H1.extend`
  margin-right: 10px;
  margin-top: 10px;
`

const Workshop = () =>
  <Container>
    <Title>Plus qu&apos;une formation, un vrai workshop.</Title>
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
  </Container>

export default Workshop
