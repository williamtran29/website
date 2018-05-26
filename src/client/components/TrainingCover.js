import React from 'react'
import gql from 'graphql-tag'
import styled, { css } from 'styled-components'
import { darken } from 'polished'
import { th, up } from 'smooth-ui'
import { cl } from 'shared/cloudinary'

const Picture = styled.div`
  flex-shrink: 0;
  height: 100px;
  width: 100px;
  ${props => css`
    background-image: url(${cl(props.clId, 'c_scale,w_100,h_100,dpr_2')});
  `} background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  border: 3px solid ${th('white')};
  border-radius: 50%;
  margin-top: 10px;

  ${up(
    'md',
    css`
      border: 5px solid ${th('white')};
      width: 150px;
      height: 150px;
      ${props => css`
        background-image: url(${cl(props.clId, 'c_scale,w_150,h_150,dpr_2')});
      `};
    `,
  )};
`

const Title = styled.h1`
  margin: 20px 0 0;
  font-size: 35px;
  line-height: 40px;

  ${up(
    'md',
    css`
      font-size: 60px;
      line-height: 70px;
    `,
  )};
`

const TrainingCoverComponent = ({ training, children, ...props }) => (
  <div style={{ backgroundColor: darken(0.1, training.color) }} {...props}>
    <Picture clId={training.icon} />
    <Title>{training.title}</Title>
    {children}
  </div>
)

const TrainingCover = styled(TrainingCoverComponent)`
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.9) -20%,
    rgba(255, 255, 255, 0.15) 120%
  );
  background-blend-mode: overlay;
  color: ${th('white')};
  text-transform: uppercase;
  font-weight: 700;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 60px 20px 30px;
`

export const trainingCoverFragment = gql`
  fragment TrainingCover on Training {
    color
    icon
    title
  }
`

export default TrainingCover
