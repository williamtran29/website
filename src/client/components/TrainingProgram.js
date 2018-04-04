import React from 'react'
import gql from 'graphql-tag'
import BaseLinkButton from './BaseLinkButton'
import Markdown from './Markdown'
import TrainerCard, { trainerCardFragment } from './TrainerCard'
import MainSection from './MainSection'
import MainSectionTitle from './MainSectionTitle'
import TrainingCourse, { trainingCourseFragment } from './TrainingCourse'

const TrainingProgram = ({ training }) => (
  <React.Fragment>
    <MainSection>
      <MainSectionTitle>Qu’allez-vous apprendre ?</MainSectionTitle>
      {training.courses.map((course, index) => (
        <TrainingCourse key={index} course={course} />
      ))}
      {training.pdf ? (
        <BaseLinkButton
          href={training.pdf}
          download
          style={{ margin: '10px 0 20px' }}
        >
          Télécharger le programme en PDF
        </BaseLinkButton>
      ) : null}
    </MainSection>
    <MainSection>
      <MainSectionTitle>Les Objectifs</MainSectionTitle>
      <Markdown source={training.objectives} />
    </MainSection>
    <MainSection>
      <MainSectionTitle>À qui s’adresse cette formation ?</MainSectionTitle>
      <Markdown source={training.prerequisites} />
    </MainSection>
    <MainSection>
      <MainSectionTitle>Votre formateur</MainSectionTitle>
      {training.trainers.map((trainer, index) => (
        <TrainerCard
          trainer={trainer}
          style={{ margin: '30px 0' }}
          key={index}
        />
      ))}
    </MainSection>
  </React.Fragment>
)

export const trainingProgramFragment = gql`
  fragment TrainingProgram on Training {
    courses {
      ...TrainingCourse
    }
    pdf
    objectives
    prerequisites
    trainers {
      ...TrainerCard
    }
  }

  ${trainingCourseFragment}
  ${trainerCardFragment}
`

export default TrainingProgram
