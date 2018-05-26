/* eslint-disable react/no-array-index-key */
import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet-async'
import gql from 'fraql'
import { graphql } from 'react-apollo'
import ReactMarkdown from 'react-markdown'
import theme from 'client/style/legacyTheme'
import PageContainer from 'client/components/PageContainer'
import Logo from 'client/components/Logo'
import { pluralize } from 'shared/i18n'
import Separator from 'client/components/Separator'
import TrainingIcon from 'client/components/TrainingIcon'

const Container = styled.div`
  flex: 1;
  padding-bottom: 100px;
`
const Section = styled.div`
  margin-bottom: 20px;
`

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 10px;
  color: ${theme.colors.primary};
`

const Markdown = styled(ReactMarkdown)`
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;

  ul {
    margin: 0;
    padding-left: 20px;
  }

  li > p {
    margin: 0;
  }
`

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  padding-top: 50px;
  font-size: 12px;
  line-height: 16px;
`

const Header = styled.header`
  display: flex;
  margin-bottom: 40px;
`

const HeaderMain = styled.div`
  flex: 1;
  display: flex;
  margin-right: 20px;
`

const HeaderPicture = styled.div`
  margin-right: 10px;
  flex-shrink: 0;
  width: 50px;
  height: 50px;
`

const Title = styled.div`
  font-size: 20px;
  line-height: 24px
  font-weight: 400;
  flex: 1;
`

const Subtitle = styled.div`
  font-size: 17px;
  font-weight: 300;
`

const Brand = styled.div`
  width: 160px;
`

const ColoredLogo = styled(Logo)`
  color: ${theme.colors.primary};
  width: 160px;
`

const Website = styled.div`
  font-size: 12px;
  font-weight: 300;
`

const Courses = styled.div`
  margin: 10px 0 20px;
`

const Course = styled.div`
  margin: 10px 0;
  page-break-inside: avoid;
`

const CourseTitle = styled.div`
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  margin: 0 0 10px;
`

const CourseContent = Markdown.extend`
  ul > li > ul {
    display: none;
  }
`

const withTraining = graphql(
  gql`
    query trainingData($slug: String!) {
      training(slug: $slug) {
        slug
        title
        abstract
        duration
        icon
        objectives
        prerequisites
        color
        icon
        courses {
          title
          content
        }
      }
    }
  `,
  {
    options: ({ match }) => ({ variables: { slug: match.params.slug } }),
  },
)

const pedagogy = `La formation est animée en présentiel par un formateur Smooth Code
qui alterne entre explications théoriques et exercices
d’application. Les exercices font partie d’un projet de
développement qui permet aux participants de mettre pratique les
nouveautés présentées. Le support de cours au format PDF est
partagé avec les participants au premier jour. Le formateur
présente les supports de cours grâce à un vidéoprojecteur.

Suite à la formation, une attestion sanctionnant l’acquisition des
compétences visées est envoyée aux participants.`

const prerequisites = `
  - Les participants doivent maitriser des bases de la programmation JavaScript.
  - Les participants doivent venir avec leur ordinateur.
`

const TrainingPrint = ({ data: { training } }) =>
  training ? (
    <PageContainer>
      <Helmet>
        <title>{training.longTitle}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Container>
        <Header>
          <HeaderMain>
            <HeaderPicture>
              <TrainingIcon training={training} />
            </HeaderPicture>
            <div>
              <Title>
                {training.title} • {training.duration}{' '}
                {pluralize('jour', training.duration)}
              </Title>
              <Subtitle>{training.abstract}</Subtitle>
            </div>
          </HeaderMain>
          <Brand>
            <ColoredLogo />
            <Website>www.smooth-code.com</Website>
          </Brand>
        </Header>
        <Section>
          <SectionTitle>Les Objectifs</SectionTitle>
          <Markdown source={training.objectives} />
        </Section>
        <Section>
          <SectionTitle>A qui s’adresse cette formation ?</SectionTitle>
          <Markdown source={training.prerequisites} />
        </Section>
        <Section>
          <SectionTitle>Qu’allez-vous apprendre ?</SectionTitle>
          <Courses>
            {training.courses.map(course => (
              <Course>
                <CourseTitle>{course.title}</CourseTitle>
                <CourseContent source={course.content} />
              </Course>
            ))}
          </Courses>
        </Section>
        <Section>
          <SectionTitle>Pédagogie et Évaluation</SectionTitle>
          <Markdown source={pedagogy} />
        </Section>
        <Section>
          <SectionTitle>Prérequis</SectionTitle>
          <Markdown source={prerequisites} />
        </Section>
        <Footer>
          <Separator style={{ width: 250, margin: '10px auto' }} />
          <div>
            <strong>Une question ?</strong> Vous avez besoin d’un renseignement
            ou d’une formation personnalisée ? Nous nous ferons un plaisir de
            répondre à vos questions. <strong>Tél. :</strong> 09 87 02 24 12 -{' '}
            <strong>Email :</strong> contact@smooth-code.com
          </div>
        </Footer>
      </Container>
    </PageContainer>
  ) : null

export default withTraining(TrainingPrint)
