import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Markdown from './Markdown'

const Title = styled.h3`
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  margin: 30px 0 5px;
`

const TrainingCourseComponent = ({ course, ...props }) => (
  <div {...props}>
    <Title>{course.title}</Title>
    <Markdown source={course.content} />
  </div>
)

const TrainingCourse = styled(TrainingCourseComponent)`
  margin-bottom: 10px;
`

export const trainingCourseFragment = gql`
  fragment TrainingCourse on Course {
    title
    content
  }
`

export default TrainingCourse
