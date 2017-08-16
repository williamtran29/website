import React from 'react'
import compose from 'recompact/compose'
import styled, { keyframes } from 'styled-components'
import { Link as RRLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import { Link as ScrollLink } from 'react-scroll'
import { StickyContainer, Sticky } from 'react-sticky'
import FaPhone from 'react-icons/lib/fa/phone'
import FaEnvelope from 'react-icons/lib/fa/envelope'
import theme from 'style/theme'
import { pluralize } from 'modules/i18n'
import { completeUrl } from 'modules/urlUtil'
import JsonLd from 'modules/components/JsonLd'
import Link from 'modules/components/Link'
import TrainingsQuery from 'client/queries/TrainingsQuery'
import Header from 'client/Header'
import Footer from 'client/Footer'
import PageContainer from 'client/PageContainer'
import TrainingHero from 'modules/components/TrainingHero'
import { LinkButton } from 'modules/components/Button'
import CourseCard from 'modules/components/CourseCard'
import TrainerCard from 'modules/components/TrainerCard'
import SessionCard from 'modules/components/SessionCard'
import Markdown from 'modules/components/Markdown'
import { trainingsRoute, contactRoute } from 'modules/routePaths'
import { sessionLd, breadcrumbLd } from 'client/linkedData'

const Container = styled.div`
  flex: 1;
  margin: 0 auto;
  max-width: 1034px;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 500px;

  @media (min-width: ${theme.medias.phablet}) {
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

  @media (min-width: ${theme.medias.phablet}) {
    animation: 400ms ${contentAnimation} ease-out;
    animation-fill-mode: backwards;
  }
`

const NavContainer = styled.div`
  background-color: #fff;
  padding: 0 20px;
  z-index: 20;

  @media (min-width: ${theme.medias.phablet}) {
    padding: 0 50px 0 10px;
  }
`

const Nav = styled.nav`
  height: 40px;
  border-bottom: 1px solid ${theme.colors.grayLight};
  font-size: 15px;
  line-height: 20px;
  padding: 10px 0;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`

const NavItemLink = styled(ScrollLink).attrs({
  activeClass: 'active',
  spy: true,
  smooth: true,
  offset: -60,
})`
  color: ${theme.colors.primary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &.active {
    font-weight: 600;
    cursor: default;
    color: ${theme.colors.grayDark};

    &:hover {
      text-decoration: none;
    }
  }
`

const Section = styled.section`
  border-bottom: 1px solid ${theme.colors.grayLight};
  margin: 0 20px;

  @media (min-width: ${theme.medias.phablet}) {
    margin: 0 50px 0 10px;
  }
`

const SectionTitle = styled.h3`
  margin: 20px 0;
  font-weight: 600;
  margin-top: 20px;
`

const CourseCardContainer = styled.div`
  margin: 20px 0;

  &:last-child {
    margin-bottom: 40px;
  }
`

const DayTitle = styled.div`
  font-size: 24px;
  line-height: 30px;
  margin: 20px 0;
`

const TrainerCardContainer = styled.div`margin: 30px 0;`

const NavItemSeparator = () => <span aria-hidden="true"> · </span>

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
  @media (min-width: ${theme.medias.phablet}) {
    animation: 400ms ${sidebarAnimation} ease-out;
    animation-fill-mode: backwards;
    width: 374px;
    border-left: 1px solid ${theme.colors.grayLight};
  }
`

const SidebarStickyContainer = styled(StickyContainer)`
  @media (min-width: ${theme.medias.phablet}) {
    height: 100%;
    overflow: hidden;
  }

  @media (max-width: ${theme.medias.phablet}) {
    div:first-child > div:first-child {
      padding-bottom: 0 !important;
    }
  }
`

const SidebarSticky = styled.div`
  @media (max-width: ${theme.medias.phablet}) {
    position: relative !important;
    top: 0 !important;
    left: 0 !important;
  }
`

const SidebarSection = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${theme.colors.grayLight};

  &:last-child {
    border-bottom: 0;
  }

  @media (min-width: ${theme.medias.phablet}) {
    padding: 20px 10px 30px 30px;
  }
`

const SidebarSectionTitle = styled.div`
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 20px;
`

const SidebarText = styled.div`
  margin: 30px 0;
  font-size: 15px;
  line-height: 20px;
`

const Price = styled.div`
  margin: 20px 0 30px;
  font-size: 15px;
  line-height: 20px;
  display: flex;
`

const PriceDetail = styled.div`flex: 1;`

const PriceTotal = styled.div`
  flex: 1;
  font-weight: 600;
  text-align: right;
`

const Sessions = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;
`

const SessionCardLink = styled(RRLink)`
  margin: 0 10px;
  transition: transform 300ms;
  will-change: transform;

  &:hover {
    transform: scale(1.05);
  }
`

const Contact = styled.div`
  margin: 20px 0 30px;
  font-size: 16px;
  line-height: 20px;
  display: flex;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 20px;
    line-height: 24px;
  }

  ${Link} {
    flex: 1;
    display: flex;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`

const Phone = styled(Link)`text-align: left;`
const Email = styled(Link)`
  text-align: right;
  justify-content: flex-end;
`

const ESSENTIAL_QUERY = gql`
  query trainingEssential($slug: ID!) {
    training(slug: $slug) {
      ...TrainingEssential
    }
  }

  ${TrainingsQuery.fragments.trainingEssential}
`

const COMPLETE_QUERY = gql`
  query trainingComplete($slug: ID!) {
    training(slug: $slug) {
      slug
      link
      title
      longTitle
      socialTitle
      socialAbstract
      socialPicture
      abstract
      description
      objectives
      prerequisites
      duration
      coursePrice
      dayPrice
      intraPrice
      interPrice
      courses {
        id
        title
        outline
        path {
          id
          color
        }
      }
      trainers {
        slug
        fullName
        description
        picture
        link
      }
      sessions {
        id
        validFrom
        startDate
        endDate
        link
        location {
          id
          name
          address
          zipcode
          city
        }
      }
    }
  }
`

const options = ({ match }) => ({ variables: { slug: match.params.slug } })

const withEssential = graphql(ESSENTIAL_QUERY, {
  name: 'essential',
  options,
})

const withComplete = graphql(COMPLETE_QUERY, {
  name: 'complete',
  options,
})

export default compose(
  withEssential,
  withComplete,
)(({ essential: { training: essential }, complete: { training } }) =>
  <PageContainer>
    {training &&
      <Helmet>
        <title>
          {training.longTitle}
        </title>
        <meta name="description" content={training.abstract} />
        <meta property="og:title" content={training.socialTitle} />
        <meta property="og:description" content={training.socialAbstract} />
        <meta property="og:image" content={training.socialPicture} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={training.socialPicture} />
      </Helmet>}
    <Header transparent />
    {essential && <TrainingHero {...essential} />}
    <Container>
      {training &&
        <Content>
          <StickyContainer>
            <Sticky>
              {({ style }) =>
                <NavContainer style={style}>
                  <Nav>
                    <NavItemLink to="description">Description</NavItemLink>
                    <NavItemSeparator />
                    <NavItemLink to="objectives">Objectives</NavItemLink>
                    <NavItemSeparator />
                    <NavItemLink to="prerequisites">Pré-requis</NavItemLink>
                    <NavItemSeparator />
                    <NavItemLink to="outline">Programme</NavItemLink>
                    <NavItemSeparator />
                    <NavItemLink to="trainers">Formateurs</NavItemLink>
                  </Nav>
                </NavContainer>}
            </Sticky>
            <Section id="description">
              <SectionTitle>Description</SectionTitle>
              <Markdown source={training.description} />
            </Section>
            <Section id="objectives">
              <SectionTitle>Objectifs</SectionTitle>
              <Markdown source={training.objectives} />
            </Section>
            <Section id="prerequisites">
              <SectionTitle>Pré-requis</SectionTitle>
              <Markdown source={training.prerequisites} />
            </Section>
            <Section id="outline">
              <SectionTitle>Programme</SectionTitle>
              {training.courses.reduce((elements, course, index) => {
                if (index % 2 === 0) {
                  const day = index / 2 + 1
                  elements.push(
                    <DayTitle key={`day-${day}`}>
                      Jour {day}
                    </DayTitle>,
                  )
                }
                elements.push(
                  <CourseCardContainer key={course.id}>
                    <CourseCard {...course} />
                  </CourseCardContainer>,
                )
                return elements
              }, [])}
            </Section>
            <Section id="trainers">
              <SectionTitle>Formateurs</SectionTitle>
              {training.trainers.map(trainer =>
                <TrainerCardContainer key={trainer.slug}>
                  <TrainerCard {...trainer} />
                </TrainerCardContainer>,
              )}
            </Section>
          </StickyContainer>
        </Content>}
      {training &&
        <Sidebar>
          <SidebarStickyContainer>
            <Sticky>
              {({ style }) =>
                <SidebarSticky style={style}>
                  {training.sessions.length > 0 &&
                    <SidebarSection>
                      <SidebarSectionTitle>
                        Inter-entreprise (de 4 à 10 pers.)
                      </SidebarSectionTitle>
                      <Price>
                        <PriceDetail>
                          {training.coursePrice}€ x {training.courses.length}{' '}
                          {pluralize('module', training.courses.length)}
                        </PriceDetail>
                        <PriceTotal>
                          {training.interPrice}€ HT / pers.
                        </PriceTotal>
                      </Price>
                      <Sessions>
                        {training.sessions.map(session =>
                          <SessionCardLink to={session.link} key={session.id}>
                            <SessionCard {...session} />
                          </SessionCardLink>,
                        )}
                      </Sessions>
                      <LinkButton to={training.sessions[0].link} block>
                        Réserver en ligne
                      </LinkButton>
                    </SidebarSection>}
                  <SidebarSection>
                    <SidebarSectionTitle>
                      Intra-entreprise (min 3 pers.)
                    </SidebarSectionTitle>
                    <Price>
                      <PriceDetail>
                        {training.dayPrice}€ x {training.duration}{' '}
                        {pluralize('jour', training.duration)}
                      </PriceDetail>
                      <PriceTotal>
                        {training.intraPrice}€ HT / pers.
                      </PriceTotal>
                    </Price>
                    <SidebarText>
                      Il vous est possible d’accueillir la formation dans vos
                      locaux et de la personnaliser.
                    </SidebarText>
                    <LinkButton to={contactRoute()} block>
                      Demander un devis
                    </LinkButton>
                  </SidebarSection>
                  <SidebarSection>
                    <SidebarSectionTitle>Une question ?</SidebarSectionTitle>
                    <SidebarText>
                      Vous avez besoin d’un renseignement ou d’une formation
                      personnalisée ?<br />
                      Nous nous ferons un plaisir de répondre à vos questions.
                    </SidebarText>
                    <Contact>
                      <Phone href="tel:+33650588079">
                        <FaPhone />
                        <span>06 50 58 80 79</span>
                      </Phone>
                      <Email href="mailto:contact@smooth-code.com">
                        <FaEnvelope />
                        <span>Email</span>
                      </Email>
                    </Contact>
                  </SidebarSection>
                </SidebarSticky>}
            </Sticky>
          </SidebarStickyContainer>
        </Sidebar>}
    </Container>
    <Footer />
    {training &&
      <JsonLd>
        {breadcrumbLd({
          links: [
            { url: completeUrl(trainingsRoute()), name: 'Nos formations' },
            { url: completeUrl(training.link), name: training.title },
          ],
        })}
      </JsonLd>}
    {training &&
      <JsonLd>
        {{
          '@context': 'http://schema.org',
          '@type': 'Product',
          name: training.longTitle,
          description: training.abstract,
          offers: {
            '@type': 'Offer',
            price: `${training.interPrice}.00`,
            priceCurrency: 'EUR',
            availability: 'http://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'Smooth Code',
              url: 'https://www.smooth-code.com',
            },
          },
        }}
      </JsonLd>}
    {training &&
      <JsonLd>
        {{
          '@context': 'http://schema.org',
          '@type': 'Course',
          name: training.longTitle,
          description: training.abstract,
          provider: {
            '@type': 'Organization',
            name: 'Smooth Code',
            url: 'https://www.smooth-code.com',
          },
        }}
      </JsonLd>}
    {training &&
      <JsonLd>
        {training.sessions.map(session =>
          sessionLd(
            { session, training, trainers: training.trainers },
            { id: true },
          ),
        )}
      </JsonLd>}
  </PageContainer>,
)
