import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { clUrl } from 'modules/cloudinary'
import theme from 'style/theme'
import Hero from 'modules/components/Hero'

const Picture = styled.div`
  flex-shrink: 0;
  height: 150px;
  width: 150px;
  ${props =>
    props.background
      ? `background-image: url(${props.background});`
      : ''} background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  border: 5px solid #fff;
  border-radius: 50%;
  margin-top: 10px;
`

const Title = styled.h1`
  margin: 20px 0 0;
  font-size: 35px;
  line-height: 45px;
  font-weight: 300;
  color: #fff;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 50px;
    line-height: 60px;
  }
`

const Lead = styled.div`
  margin: 10px 0 0;
  font-size: 25px;
  line-height: 35px;
  font-weight: 300;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 30px;
    line-height: 40px;
  }
`

const TrainingHero = ({ icon, title, abstract, path }) =>
  <Hero
    style={{ height: 420 }}
    background={`linear-gradient(0, ${path.color} -20%, ${darken(
      0.35,
      path.color,
    )} 120%)`}
  >
    <Picture background={clUrl(icon, 'c_scale,w_150,h_150,dpr_2')} />
    <Title>
      {title}
    </Title>
    <Lead>
      {abstract}
    </Lead>
  </Hero>

export default TrainingHero
