/* eslint-disable react/no-array-index-key */
import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import ReactMarkdown from 'react-markdown'
import theme from 'style/theme'
import PageContainer from 'client/PageContainer'
import Logo from 'client/Logo'
import { pluralize } from 'modules/i18n'
import Separator from 'modules/components/Separator'
import TrainingIcon from 'modules/components/TrainingIcon'

const Container = styled.div`
  flex: 1;
  padding-bottom: 100px;
`
const Section = styled.div`
  margin-bottom: 20px;
  page-break-inside: avoid;
`
const SectionTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
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

const Brand = styled.div`width: 160px;`

const ColoredLogo = styled(Logo)`
  color: ${theme.colors.primary};
  width: 160px;
`

const Website = styled.div`
  font-size: 12px;
  font-weight: 300;
`

const Planning = styled.div`
  display: flex;
  margin: 10px 0 20px;
`

const Day = styled.div`
  flex: 1;
  margin-right: 5px;
  font-size: 12px;

  &:last-child {
    margin-right: 0;
  }
`
const DayTitle = styled.div`
  border-left: 4px ${theme.colors.primary} solid;
  padding-left: 10px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
`
const Intro = styled.div`
  display: flex;

  ${Section} {
    flex: 1;
    margin-right: 20px;
  }
`

const Infos = styled.div`
  flex-shrink: 0;
  width: 160px;
`

const Info = styled.div`margin-bottom: 10px;`

const InfoLabel = styled.div`
  margin-bottom: 5px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
`

const InfoContent = styled.div`font-size: 18px;`

const coursesToDays = courses =>
  courses.reduce((days, course, index) => {
    const dayIndex = Math.ceil((index + 1) / 2) - 1
    days[dayIndex] = days[dayIndex] || [] // eslint-disable-line no-param-reassign
    days[dayIndex].push(course)
    return days
  }, [])

const CourseContainer = styled.div`margin: 10px 0;`
const CourseTitle = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
`

const CourseOutline = Markdown.extend`
  ul > li > ul {
    display: none;
  }
`

const Course = ({ outline, title }) => (
  <CourseContainer>
    <CourseTitle>{title}</CourseTitle>
    <CourseOutline source={outline} />
  </CourseContainer>
)

const Outline = ({ courses }) => {
  const days = coursesToDays(courses)
  return (
    <Planning>
      {days.map((dayCourses, dayIndex) => (
        <Day key={dayIndex}>
          <DayTitle>Jour {dayIndex + 1}</DayTitle>
          {dayCourses.map(course => <Course key={course.id} {...course} />)}
        </Day>
      ))}
    </Planning>
  )
}

const withTraining = graphql(
  gql`
    query trainingData($slug: ID!) {
      training(slug: $slug) {
        slug
        title
        longTitle
        abstract
        duration
        icon
        objectives
        prerequisites
        description
        path {
          id
          color
        }
        courses {
          id
          title
          outline
        }
      }
    }
  `,
  {
    options: ({ match }) => ({ variables: { slug: match.params.slug } }),
  },
)

export default withTraining(
  ({ data: { training } }) =>
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
                <TrainingIcon {...training} />
              </HeaderPicture>
              <div>
                <Title>{training.longTitle}</Title>
                <Subtitle>{training.abstract}</Subtitle>
              </div>
            </HeaderMain>
            <Brand>
              <ColoredLogo />
              <Website>www.smooth-code.com</Website>
            </Brand>
          </Header>
          <Intro>
            <Section>
              <SectionTitle>Objectifs</SectionTitle>
              <Markdown source={training.objectives} />
            </Section>
            <Infos>
              <Info>
                <InfoLabel>Durée :</InfoLabel>
                <InfoContent>
                  {training.duration} {pluralize('jour', training.duration)}
                </InfoContent>
              </Info>
            </Infos>
          </Intro>
          <Section>
            <SectionTitle>Pré-requis</SectionTitle>
            <Markdown source={training.prerequisites} />
          </Section>
          <Section>
            <SectionTitle>Programme</SectionTitle>
            <Outline courses={training.courses} />
          </Section>
          <Section>
            <SectionTitle>Description</SectionTitle>
            <Markdown source={training.description} />
          </Section>
          <Footer>
            <Separator style={{ width: 250, margin: '10px auto' }} />
            <div>
              <strong>Une question ?</strong> Vous avez besoin d’un
              renseignement ou d’une formation personnalisée ? Nous nous ferons
              un plaisir de répondre à vos questions. <strong>Tél. :</strong>{' '}
              06 50 58 80 79 - <strong>Email :</strong> contact@smooth-code.com
            </div>
          </Footer>
        </Container>
      </PageContainer>
    ) : null,
)
