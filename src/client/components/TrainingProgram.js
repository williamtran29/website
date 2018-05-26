import React from 'react'
import gql from 'fraql'
import BaseLinkButton from './BaseLinkButton'
import Markdown from './Markdown'
import TrainerCard from './TrainerCard'
import MainSection from './MainSection'
import MainSectionTitle from './MainSectionTitle'
import TrainingCourse from './TrainingCourse'

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

TrainingProgram.fragments = {
  training: gql`
    fragment _ on Training {
      courses {
        ${TrainingCourse.fragments.course}
      }
      pdf
      objectives
      prerequisites
      trainers {
        ${TrainerCard.fragments.trainer}
      }
    }
  `,
}

export default TrainingProgram
