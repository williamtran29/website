import React from 'react'
import styled from 'styled-components'
import { transparentize, darken } from 'polished'
import Markdown from 'modules/components/Markdown'

const Container = styled.div`
  background-image: linear-gradient(
    -180deg,
    ${props => transparentize(0.95, props.color)} 0%,
    ${props => transparentize(0.9, props.color)} 100%
  );
  box-shadow: 0 7px 14px 0 rgba(93, 60, 50, 0.10),
    0 3px 6px 0 rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  padding: 20px;
`

const Title = styled.h4`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  margin: 0;
  color: ${props => darken(0.3, props.color)};
`

const CourseCard = ({ title, outline, path }) =>
  <Container color={path.color}>
    <Title color={path.color}>
      {title}
    </Title>
    <Markdown source={outline} />
  </Container>

export default CourseCard
