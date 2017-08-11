import React from 'react'
import compose from 'recompact/compose'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import ReactMarkdown from 'react-markdown'
import { Link as ScrollLink, Element as ScrollElement } from 'react-scroll'
import { StickyContainer, Sticky } from 'react-sticky'
import theme from 'style/theme'
import { completeUrl } from 'modules/urlUtil'
import TrainingCard from 'modules/components/TrainingCard'
import JsonLd from 'modules/components/JsonLd'
import TrainingsQuery from 'client/queries/TrainingsQuery'
import Header from 'client/Header'
import Footer from 'client/Footer'
import PageContainer from 'client/PageContainer'
import TrainingHero from 'modules/components/TrainingHero'

const Container = styled.div`
  flex: 1;
  margin: 0 auto;
  max-width: 1034px;
  width: 100%;
`

const Content = styled.div`
  flex: 1;
  padding: 0 50px 0 10px;
`

const Nav = styled.nav`
  background-color: white;
  height: 40px;
  border-bottom: 1px solid ${theme.colors.grayLight};
  font-size: 15px;
  line-height: 20px;
  padding: 10px 0;
`

const NavItemLink = styled(ScrollLink).attrs({
  activeClass: 'active',
  spy: true,
  smooth: true,
})`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &.active {
    font-weight: 600;
    cursor: default;

    &:hover {
      text-decoration: none;
    }
  }
`

const Markdown = styled(ReactMarkdown)`
  font-size: 17px;
  line-height: 22px;
  font-weight: 300;
  letter-spacing: 0.2px;

  p {
    margin: 20px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    font-weight: 400;
  }
`

const Section = styled.section`
  padding-bottom: 20px;
  border-bottom: 1px solid ${theme.colors.grayLight};
`

const NavItemSeparator = () => <span aria-hidden="true"> · </span>

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
      title
      description
      objectives
      prerequisites
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
    <Helmet />
    <Header transparent />
    {essential && <TrainingHero {...essential} />}
    <Container>
      <Content>
        <StickyContainer>
          <Sticky>
            {({ style }) =>
              <Nav style={style}>
                <NavItemLink to="description">Description</NavItemLink>
                <NavItemSeparator />
                <NavItemLink to="objectives">Objectives</NavItemLink>
                <NavItemSeparator />
                <NavItemLink to="prerequisites">Pré-requis</NavItemLink>
                <NavItemSeparator />
                <NavItemLink
                  activeClass="active"
                  spy
                  smooth
                  offset={-60}
                  to="trainers"
                >
                  Formateurs
                </NavItemLink>
              </Nav>}
          </Sticky>
          <Section id="description">
            {training && <Markdown source={training.description} />}
          </Section>
          <Section id="objectives">
            {training && <Markdown source={training.objectives} />}
          </Section>
          <Section id="prerequisites">
            {training && <Markdown source={training.prerequisites} />}
          </Section>
        </StickyContainer>
      </Content>
    </Container>
    <Footer />
  </PageContainer>,
)
