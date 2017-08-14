import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import theme from 'style/theme'
import TrainingCard from 'modules/components/TrainingCard'

const Trainings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;
  }
`

const TrainingLink = styled(Link)`
  display: block;
  margin: 0 0 30px;
  width: 100%;
  max-width: 260px;
  text-decoration: none;
  transition: transform 300ms;
  will-change: transform;

  &:hover {
    transform: translateY(-8px);
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (min-width: ${theme.medias.phablet}) {
    margin: 0 20px 0;
    width: 220px;

    &:last-child {
      margin-right: 0;
    }
  }
`

const TrainingList = ({ trainings }) =>
  <Trainings>
    {trainings.map(training =>
      <TrainingLink key={training.slug} to={training.link}>
        <TrainingCard {...training} />
      </TrainingLink>,
    )}
  </Trainings>

export default TrainingList
