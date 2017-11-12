import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import intersperse from 'intersperse'
import compose from 'recompact/compose'
import { Helmet } from 'react-helmet'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { StickyContainer, Sticky } from 'react-sticky'
import { darken } from 'polished'
import { ScrollLinkButton } from 'modules/components/Button'
import { getDatesBetween, shortDuration, longDuration } from 'modules/dateUtils'
import moment from 'modules/moment'
import { clUrl } from 'modules/cloudinary'
import PageContainer from 'client/PageContainer'
import Header from 'client/Header'
import Footer from 'client/Footer'
import JsonLd from 'modules/components/JsonLd'
import Markdown from 'modules/components/Markdown'
import TrainerCard from 'modules/components/TrainerCard'
import SessionLink from 'modules/components/SessionLink'
import { sessionCardFragment } from 'modules/queries'
import { sessionLd } from 'client/linkedData'
import { homeRoute } from 'modules/routePaths'
import theme from 'style/theme'
import redirectIfNotFound from 'client/hoc/redirectIfNotFound'
import { summarizeSession, generateSocialPicture } from 'modules/sessionUtil'
import ContactForm from 'client/contact/ContactForm'

const Cover = styled.div`
  background-color: ${props => darken(0.1, props.bgColor)};
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.9) -20%,
    rgba(255, 255, 255, 0.15) 120%
  );
  background-blend-mode: overlay;
  color: #fff;
  text-transform: uppercase;
  font-weight: 700;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 60px 20px 30px;
`

const Picture = styled.div`
  flex-shrink: 0;
  height: 100px;
  width: 100px;
  ${props => css`
    background-image: url(${clUrl(
      props.cloudinaryId,
      'c_scale,w_100,h_100,dpr_2',
    )});
  `} background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  border: 3px solid #fff;
  border-radius: 50%;
  margin-top: 10px;

  @media (min-width: ${theme.medias.phablet}) {
    border: 5px solid #fff;
    width: 150px;
    height: 150px;
    ${props => css`
      background-image: url(${clUrl(
        props.cloudinaryId,
        'c_scale,w_150,h_150,dpr_2',
      )});
    `};
  }
`

const Title = styled.h1`
  margin: 20px 0 0;
  font-size: 35px;
  line-height: 40px;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 60px;
    line-height: 70px;
  }
`

const DateLocation = styled.div`
  font-size: 24px;
  line-height: 28px;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 40px;
    line-height: 50px;
  }
`

const Container = styled.div`
  flex: 1;
  margin: 0 auto;
  max-width: 1034px;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  min-height: 500px;

  @media (min-width: ${theme.medias.desktop}) {
    flex-direction: row;
  }
`

const contentAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const Content = styled.div`
  flex: 1;

  @media (min-width: ${theme.medias.desktop}) {
    animation: 400ms ${contentAnimation} ease-out;
    animation-fill-mode: backwards;
  }
`

const Section = styled.section`
  border-bottom: 1px solid ${theme.colors.grayLight};
  margin: 0 20px;

  @media (min-width: ${theme.medias.desktop}) {
    margin: 0 50px 0 10px;
  }
`

const ContactSection = Section.extend`
  border-bottom: 0;
  padding-bottom: 50px;
`

const SectionTitle = styled.h2`
  margin: 20px 0;
  font-weight: 300;
  font-size: 30px;
  line-height: 40px;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 40px;
    line-height: 50px;
  }
`

const TrainerCardContainer = styled.div`
  margin: 30px 0;
`

const sidebarAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
  }
`

const Sidebar = styled.aside`
  @media (min-width: ${theme.medias.desktop}) {
    animation: 400ms ${sidebarAnimation} ease-out;
    animation-fill-mode: backwards;
    width: 374px;
    border-left: 1px solid ${theme.colors.grayLight};
  }
`

const SidebarStickyContainer = styled(StickyContainer)`
  @media (min-width: ${theme.medias.desktop}) {
    height: 100%;
    overflow: hidden;
  }

  @media (max-width: ${theme.medias.desktop}) {
    div:first-child > div:first-child {
      padding-bottom: 0 !important;
    }
  }
`

const SidebarSticky = styled.div`
  @media (max-width: ${theme.medias.desktop}) {
    position: relative !important;
    top: 0 !important;
    left: 0 !important;
  }
`

const SidebarSection = styled.div`
  padding: 10px 20px 40px;

  @media (min-width: ${theme.medias.desktop}) {
    padding: 10px 10px 30px 30px;
    border-bottom: 1px solid ${theme.colors.grayLight};

    &:last-child {
      border-bottom: 0;
    }
  }
`

const OtherWorkshops = styled(SidebarSection)`
  display: none;

  @media (min-width: ${theme.medias.desktop}) {
    display: block;
  }
`

const SidebarSectionTitle = styled.div`
  margin: 20px 0 10px;
  font-size: 24px;
  line-height: 30px;
`

const SidebarSectionText = styled.div`
  font-size: 20px;
  line-height: 24px;
  padding-left: 20px;
`

const Course = styled.div`
  margin-bottom: 20px;
`

const CourseTitle = styled.h3`
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  margin: 0 0 10px;
`

const PriceBlock = styled.div`
  margin: 20px 0 40px;
`

const PriceDescription = styled.div`
  font-weight: 300;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 10px;
  text-align: center;
`

const Price = styled.div`
  font-size: 40px;
  line-height: 50px;
  margin-bottom: 20px;
  text-align: center;
`

const CARD_QUERY = gql`
  query ($id: ID!) {
    session(id: $id) {
      ...SessionCard
    }
  }

  ${sessionCardFragment}
`

const COMPLETE_QUERY = gql`
  query ($id: ID!) {
    session(id: $id) {
      id
      link
      validFrom
      startDate
      endDate
      participants
      inStock
      location {
        id
        name
        address
        city
        zipcode
      }
      training {
        slug
        title
        abstract
        color
        icon
        price
        objectives
        prerequisites
        courses {
          title
          content
        }
        trainers {
          slug
          fullName
          description
          link
          picture
        }
      }
    }

    sessions {
      ...SessionCard
    }
  }

  ${sessionCardFragment}
`

const options = ({ match }) => ({
  variables: { id: match.params.sessionId },
})

export default compose(
  graphql(CARD_QUERY, {
    name: 'cardData',
    options,
  }),
  graphql(COMPLETE_QUERY, {
    name: 'completeData',
    options,
  }),
  redirectIfNotFound({
    key: 'session',
    dataKey: 'cardData',
    to: homeRoute(),
  }),
  redirectIfNotFound({
    key: 'session',
    dataKey: 'completeData',
    to: homeRoute(),
  }),
)(
  ({
    cardData: { session: sessionCard },
    completeData: { session, sessions: siblings },
  }) => (
    <PageContainer>
      {sessionCard && (
        <Helmet>
          <title>
            {`Formation ${sessionCard.training.title} ${longDuration(
              sessionCard.startDate,
              sessionCard.endDate,
            )} à ${sessionCard.location.city}`}
          </title>
          <meta name="description" content={sessionCard.training.abstract} />
          <meta
            property="og:title"
            content={`Workshop ${sessionCard.training.title} | ${sessionCard
              .location.city} | ${shortDuration(
              sessionCard.startDate,
              sessionCard.endDate,
            )}`}
          />
          <meta
            property="og:description"
            content={sessionCard.training.abstract}
          />
          <meta
            property="og:image"
            content={generateSocialPicture(sessionCard)}
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:image"
            content={generateSocialPicture(sessionCard)}
          />
        </Helmet>
      )}
      <Header transparent />
      {sessionCard && (
        <Cover bgColor={sessionCard.training.color}>
          <Picture cloudinaryId={sessionCard.training.icon} />
          <Title>{sessionCard.training.title}</Title>
          <DateLocation>{summarizeSession(sessionCard)}</DateLocation>
        </Cover>
      )}
      <Container>
        {session ? (
          <Content>
            <Section>
              <SectionTitle>Qu’allez-vous apprendre ?</SectionTitle>
              {session.training.courses.map((course, index) => (
                /* eslint-disable react/no-array-index-key */
                <Course key={index}>
                  <CourseTitle>{course.title}</CourseTitle>
                  <Markdown source={course.content} />
                </Course>
                /* eslint-enable react/no-array-index-key */
              ))}
            </Section>
            <Section>
              <SectionTitle>Les Objectifs</SectionTitle>
              <Markdown source={session.training.objectives} />
            </Section>
            <Section>
              <SectionTitle>A qui s’adresse le Workshop ?</SectionTitle>
              <Markdown source={session.training.prerequisites} />
            </Section>
            <Section>
              <SectionTitle>Votre formateur</SectionTitle>
              {session.training.trainers.map(trainer => (
                <TrainerCardContainer key={trainer.slug}>
                  <TrainerCard {...trainer} />
                </TrainerCardContainer>
              ))}
            </Section>
            <ContactSection id="contact">
              <SectionTitle>S’inscrire</SectionTitle>
              <ContactForm />
            </ContactSection>
          </Content>
        ) : (
          <Content />
        )}
        {sessionCard && (
          <Sidebar>
            <SidebarStickyContainer>
              <Sticky>
                {({ style }) => (
                  <SidebarSticky style={style}>
                    <SidebarSection>
                      <PriceBlock>
                        <PriceDescription>Prix par personne</PriceDescription>
                        <Price>{sessionCard.training.price}€</Price>
                        <ScrollLinkButton block spy smooth to="contact">
                          S’inscrire
                        </ScrollLinkButton>
                      </PriceBlock>
                      <SidebarSectionTitle>Dates</SidebarSectionTitle>
                      <SidebarSectionText>
                        {intersperse(
                          getDatesBetween(
                            sessionCard.startDate,
                            sessionCard.endDate,
                          ).map(date => (
                            <div key={date.toString()}>
                              {moment(date).format('DD/MM')} | 9h30 - 17h30
                            </div>
                          )),
                        )}
                      </SidebarSectionText>
                      <SidebarSectionTitle>Lieu</SidebarSectionTitle>
                      <SidebarSectionText>
                        {sessionCard.location.name}
                        <br />
                        {sessionCard.location.address}
                        <br />
                        {sessionCard.location.zipcode}{' '}
                        {sessionCard.location.city}
                      </SidebarSectionText>
                    </SidebarSection>
                    <OtherWorkshops>
                      <SidebarSectionTitle>Autres dates</SidebarSectionTitle>
                      {siblings &&
                        siblings
                          .filter(({ id }) => id !== session.id)
                          .map(sibling => (
                            <SessionLink key={sibling.id} session={sibling} />
                          ))}
                    </OtherWorkshops>
                  </SidebarSticky>
                )}
              </Sticky>
            </SidebarStickyContainer>
          </Sidebar>
        )}
      </Container>
      <Footer />
      {session && <JsonLd>{sessionLd(session)}</JsonLd>}
    </PageContainer>
  ),
)
