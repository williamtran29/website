import React from 'react'
import styled, { keyframes } from 'styled-components'
import { lighten } from 'polished'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import { Link as ScrollLink, Element as ScrollElement } from 'react-scroll'
import { StickyContainer, Sticky } from 'react-sticky'
import theme from 'style/theme'
import { completeUrl } from 'modules/urlUtil'
import TrainingList from 'modules/components/TrainingList'
import JsonLd from 'modules/components/JsonLd'
import Header from 'client/Header'
import Footer from 'client/Footer'
import TrainingsQuery from 'client/queries/TrainingsQuery'
import PageContainer from 'client/PageContainer'

const Container = styled.div`
  flex: 1;
  max-width: 1000px;
  width: 100%;
  margin: 30px auto 100px;
  display: flex;
`

const Title = styled.h1`
  margin: 30px 0;
  font-size: 42px;
  line-height: 50px;
  font-weight: 300;
`

const Sidebar = styled(StickyContainer)`
  display: none;
  width: 200px;
  border-right: 1px solid #e5e5e5;
  padding-left: 20px;
  flex-shrink: 0;

  @media (min-width: ${theme.medias.phablet}) {
    display: block;
  }
`

const SidebarTitle = styled.h3`
  font-size: 24px;
  font-weight: 400;
  line-height: 30px;
  margin: 40px 0;
`

const SidebarNavList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

const navItemAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`

const SidebarNavItem = styled.li`
  font-size: 18px;
  line-height: 20px;
  height: 20px;
  border-left: 3px solid #fff;
  padding-left: 10px;
  margin-bottom: 16px;
  animation: 400ms ${navItemAnimation} ease-out;
  animation-fill-mode: backwards;
  animation-delay: ${props => props['data-delay']}ms;
`

const SidebarNavLink = styled(ScrollLink).attrs({
  activeClass: 'active',
  spy: true,
  smooth: true,
})`
  transition: colors 200ms;
  will-change: color;
  color: ${lighten(0.1, theme.colors.grayDark)};
  cursor: pointer;

  &:hover {
     color: ${theme.colors.grayDark};
  }

  &.active {
    color: ${theme.colors.grayDark};
    font-weight: 600;
    cursor: default;
  }
`

const Main = styled.section`
  flex: 1;
  padding: 0 20px 40px;

  @media (min-width: ${theme.medias.phablet}) {
    padding: 0 0 0 40px;
  }
`

const PathColorLine = styled.div`
  width: 30px;
  height: 3px;
  will-change: transform;
  transition: transform 300ms;
  transform-origin: left;
  margin-bottom: 30px;
`

const PathBlock = styled(ScrollElement)`
  padding-bottom: 90px;
  animation: 400ms ${navItemAnimation} ease-out;
  animation-fill-mode: backwards;
  animation-delay: ${props => props['data-delay']}ms;

  &:hover ${PathColorLine} {
    transform: scaleX(1.5);
  }
`

const PathTitle = styled.h2`
  font-size: 34px;
  font-weight: 300;
  line-height: 40px;
  margin: 0 0 10px;
`

export default graphql(gql`
  query allTrainings {
    paths {
      id
      title
      color
      icon
      trainings {
        ...TrainingEssential
      }
    }
  }

  ${TrainingsQuery.fragments.trainingEssential}
`)(({ data }) =>
  <PageContainer>
    <Helmet>
      <title>Formations JavaScript, Node.js, React, RxJS et GraphQL</title>
      <meta
        name="description"
        content="Devenez opérationnel sur les sujets tels que JavaScript, Node.js, React, RxJS et GraphQL avec nos formations professionnelles de 1 à 4 jours."
      />
      <meta
        property="og:title"
        content="Formations JavaScript, Node.js, React, RxJS et GraphQL"
      />
      <meta
        property="og:description"
        content="Devenez opérationnel sur les sujets tels que JavaScript, Node.js, React, RxJS et GraphQL avec nos formations professionnelles de 1 à 4 jours."
      />
    </Helmet>
    <Header />
    <Container>
      <Sidebar>
        <Sticky>
          {({ style }) =>
            <nav style={style}>
              <SidebarTitle>Explorer</SidebarTitle>
              <SidebarNavList>
                {data.paths &&
                  data.paths.map((path, index) =>
                    <SidebarNavItem
                      key={path.id}
                      data-delay={index * 75}
                      style={{ borderLeftColor: path.color }}
                    >
                      <SidebarNavLink to={path.id}>
                        {path.title}
                      </SidebarNavLink>
                    </SidebarNavItem>,
                  )}
              </SidebarNavList>
            </nav>}
        </Sticky>
      </Sidebar>
      <Main>
        <Title>Nos formations</Title>
        {data.paths &&
          data.paths.map((path, index) =>
            <PathBlock name={path.id} key={path.id} data-delay={index * 75}>
              <PathTitle>
                {path.title}
              </PathTitle>
              <PathColorLine style={{ backgroundColor: path.color }} />
              <TrainingList trainings={path.trainings} />
            </PathBlock>,
          )}
      </Main>
      {data.paths &&
        <JsonLd>
          {{
            '@context': 'http://schema.org',
            '@type': 'ItemList',
            itemListElement: data.paths
              .reduce(
                (items, { trainings }) => [
                  ...items,
                  ...trainings.map(training => ({
                    '@type': 'ListItem',
                    url: completeUrl(training.link),
                  })),
                ],
                [],
              )
              .map((item, index) => ({ ...item, position: index + 1 })),
          }}
        </JsonLd>}
    </Container>
    <Footer />
  </PageContainer>,
)
