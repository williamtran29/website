import React from 'react'
import styled from 'styled-components'
import { clUrl } from 'modules/cloudinary'

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${props => props.bgColor};
  background-image: linear-gradient(
    to bottom left,
    rgba(0, 0, 0, 0.90) 0%,
    rgba(255, 255, 255, 0.15) 100%
  );
  background-blend-mode: overlay;
  -webkit-print-color-adjust: exact;
`

const Icon = styled.img`
  margin: 0 auto;
  width: 100%;
  height: 100%;
`

const TrainingIcon = ({ icon, path, title }) =>
  <Container bgColor={path.color}>
    <Icon src={clUrl(icon, null, 'svg')} alt={title} />
  </Container>

export default TrainingIcon
