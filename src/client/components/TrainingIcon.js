import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { th } from 'smooth-ui'
import { cl } from 'shared/cloudinary'

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${props => props.bgColor};
  background-image: linear-gradient(
    to bottom left,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(255, 255, 255, 0.15) 100%
  );
  background-blend-mode: overlay;
  -webkit-print-color-adjust: exact;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.07);
  border-radius: 50%;
  border: 4px solid ${th('white')};
`

const Icon = styled.img`
  margin: 0 auto;
  width: 100%;
  height: 100%;
`

const TrainingIcon = ({ training }) => (
  <Container bgColor={training.color}>
    <Icon src={cl(training.icon, null, 'svg')} alt={training.title} />
  </Container>
)

export const trainingIconFragment = gql`
  fragment TrainingIcon on Training {
    color
    icon
    title
  }
`

export default TrainingIcon
