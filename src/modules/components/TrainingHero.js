import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { clUrl } from 'modules/cloudinary'
import Hero from 'modules/components/Hero'
import MainTitle from 'modules/components/MainTitle'
import Lead from 'modules/components/Lead'

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
`

const TrainingHero = ({ training }) =>
  <Hero
    style={{ minHeight: 406 }}
    background={
      training &&
      `linear-gradient(180deg, ${training.color}, ${lighten(
        0.2,
        training.color,
      )})`
    }
  >
    <Picture
      background={
        training && clUrl(training.cloudinary_id, 'c_scale,w_150,h_150,dpr_2')
      }
    />
    <MainTitle itemProp="name">
      {training && `Formation ${training.name}`}
    </MainTitle>
    <Lead itemProp="description">
      {training && training.abstract}
    </Lead>
  </Hero>

export default TrainingHero
