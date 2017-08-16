import React from 'react'
import styled from 'styled-components'
import { clUrl } from 'modules/cloudinary'
import { darken } from 'polished'
import theme from 'style/theme'

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
  max-width: 1034px;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 30px;
    line-height: 40px;
  }
`

const Hero = styled.div`
  height: 420px;
  background-color: ${props => darken(0.1, props.bgColor)};
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.90) -20%,
    rgba(255, 255, 255, 0.15) 120%
  );
  background-blend-mode: overlay;
  color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 70px 20px;
  text-align: center;
`

const TrainingHero = ({ icon, title, abstract, path }) =>
  <Hero bgColor={path.color}>
    <Picture background={clUrl(icon, 'c_scale,w_150,h_150,dpr_2')} />
    <Title>
      {title}
    </Title>
    <Lead>
      {abstract}
    </Lead>
  </Hero>

export default TrainingHero
