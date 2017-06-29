import React from 'react'
import styled from 'styled-components'
import theme from 'style/theme'
import SectionWrapper from 'client/home/SectionWrapper'
import SecondaryTitle from 'modules/components/SecondaryTitle'
import { clUrl } from 'modules/cloudinary'

const Container = styled.div`
  border-top: 1px solid ${theme.colors.grayLight};
  border-bottom: 1px solid ${theme.colors.grayLight};
`

const Wrapper = SectionWrapper.extend`
  flex-direction: column;
  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;
  }
`

const Picture = styled.div`
  flex: 1;
  height: 400px;
  background-image: url("${clUrl('trainers_kohhw1')}");
  background-repeat: no-repeat;
  background-size: cover;
  @media (min-width: ${theme.medias.phablet}) {
    align-self: center;
  }
`

const Content = styled.div`
  flex: 1;
  margin: 0 20px;
  @media (min-width: ${theme.medias.phablet}) {
    margin: 0 40px;
  }
`

const Text = styled.p`
  flex: 1;
  font-size: 18px;
  font-weight: 300;
  line-height: 1.4;
  text-align: justify;
  @media (min-width: ${theme.medias.phablet}) {
    font-size: 24px;
  }
`

const Title = SecondaryTitle.extend`
  text-align: center;
  @media (min-width: ${theme.medias.phablet}) {
    text-align: left;
  }
`

const Trainers = () =>
  <Container>
    <Wrapper flexDirection="column" lgFlexDirection="row">
      <Picture />
      <Content>
        <Title>Des formateurs, mais avant tout des développeurs.</Title>
        <Text>
          En plus d’être pédagogue, à l’écoute et expérimentés, nos formateurs
          sont aussi des développeurs. Ils utilisent chaque jour en production
          les technologies enseignées dans nos formations. Ils vous font
          profiter de leur expérience de terrain et partagent avec vous leurs
          retours d’expérience.
        </Text>
      </Content>
    </Wrapper>
  </Container>

export default Trainers
