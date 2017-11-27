import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import intersperse from 'intersperse'
import compose from 'recompact/compose'
import { Helmet } from 'react-helmet'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { StickyContainer, Sticky } from 'react-sticky'
import { darken } from 'polished'
import { BaseLinkButton, ScrollLinkButton } from 'modules/components/Button'
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
import { sessionLd, sessionLdFragment } from 'client/linkedData'
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

  @media print {
    padding: 0;
    margin-bottom: 40px;
    background: #fff;
    color: ${theme.colors.gray};
  }
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

  @media print {
    display: none;
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

  @media print {
    border: none;
  }
`

const DownloadButton = BaseLinkButton.extend`
  margin: 10px 0 20px;
`

const ContactSection = Section.extend`
  border-bottom: 0;
  padding-bottom: 50px;

  @media print {
    display: none;
  }
`

const SectionTitle = styled.h2`
  margin: 30px 0;
  font-weight: 300;
  font-size: 40px;
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
    width: 290px;
    border-left: 1px solid ${theme.colors.grayLight};
  }

  @media print {
    display: none;
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
  margin-bottom: 10px;
`

const CourseTitle = styled.h3`
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  margin: 30px 0 5px;

  @media print {
    margin: 10px 0 0;
  }
`

const PrintableMarkdown = Markdown.extend`
  @media print {
    p,
    ul {
      margin: 5px 0;
    }
  }
`

const PriceBlock = styled.div`
  margin: 20px 0 10px;
  position: relative;
`

const PriceDescription = styled.div`
  font-weight: 300;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 10px;
  text-align: center;
`
const OnlyPrintSection = Section.extend`
  display: none;

  ${SidebarSection} {
    padding: 0;
  }

  ${SidebarSectionText} {
    border-left: solid 1px black;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  @media print {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`

const Price = styled.div`
  font-size: 40px;
  line-height: 50px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 700;
`

const Full = styled.div`
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
`

const NextSession = styled(({ siblings = [], session, className }) => {
  const nextSession = siblings.filter(
    ({ id, training }) =>
      id !== session.id && training.slug === session.training.slug,
  )[0]
  if (!nextSession) return null
  return (
    <div className={className}>
      Prochaine session<br />
      <Link to={nextSession.link}>{summarizeSession(nextSession)}</Link>
    </div>
  )
})`
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  font-size: 16px;
  line-height: 24px;

  a {
    color: ${theme.colors.primary};
  }
`

const CARD_QUERY = gql`
  query ($id: ID!) {
    sessionCard: session(id: $id) {
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

      ... SessionLd
    }

    siblings: sessions {
      ... SessionCard
    }
  }

  ${sessionCardFragment}
  ${sessionLdFragment}
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
)(({ cardData: { sessionCard }, completeData: { session, siblings } }) => (
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
          content={`Workshop ${sessionCard.training.title} | ${
            sessionCard.location.city
          } | ${shortDuration(sessionCard.startDate, sessionCard.endDate)}`}
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
          <OnlyPrintSection>
            <SidebarSection>
              <SidebarSectionTitle>Prix</SidebarSectionTitle>
              <SidebarSectionText>
                {sessionCard.training.price}€
              </SidebarSectionText>
            </SidebarSection>
            <SidebarSection>
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
            </SidebarSection>
            <SidebarSection>
              <SidebarSectionTitle>Lieu</SidebarSectionTitle>
              <SidebarSectionText>
                {sessionCard.location.name}
                <br />
                {sessionCard.location.address}
                <br />
                {sessionCard.location.zipcode} {sessionCard.location.city}
              </SidebarSectionText>
            </SidebarSection>
          </OnlyPrintSection>
          <Section>
            <SectionTitle>Qu’allez-vous apprendre ?</SectionTitle>
            {session.training.courses.map((course, index) => (
              /* eslint-disable react/no-array-index-key */
              <Course key={index}>
                <CourseTitle>{course.title}</CourseTitle>
                <PrintableMarkdown source={course.content} />
              </Course>
              /* eslint-enable react/no-array-index-key */
            ))}
            <DownloadButton
              href={`http://res.cloudinary.com/smooth/raw/upload/${
                sessionCard.training.slug
              }.pdf`}
              download
            >
              Télécharger le programme en PDF
            </DownloadButton>
          </Section>
          <Section>
            <SectionTitle>Les Objectifs</SectionTitle>
            <Markdown source={session.training.objectives} />
          </Section>
          <Section>
            <SectionTitle>À qui s’adresse cette formation ?</SectionTitle>
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
          {session.inStock && (
            <ContactSection>
              <SectionTitle>Formulaire d’inscription</SectionTitle>
              <ContactForm />
            </ContactSection>
          )}
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
                      {sessionCard.inStock ? (
                        <ScrollLinkButton block spy smooth to="contact">
                          S’inscrire
                        </ScrollLinkButton>
                      ) : (
                        [
                          <Full key="full">
                            <span role="img" aria-label="Attention">
                              😓
                            </span>{' '}
                            Complet
                          </Full>,
                          <NextSession
                            key="next"
                            siblings={siblings}
                            session={sessionCard}
                          />,
                        ]
                      )}
                    </PriceBlock>
                  </SidebarSection>
                  <SidebarSection>
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
                      {sessionCard.location.zipcode} {sessionCard.location.city}
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
))
