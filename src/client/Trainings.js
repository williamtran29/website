import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import theme from 'style/theme'
import TrainingCard from 'modules/components/TrainingCard'
import Header from 'client/Header'
import Footer from 'client/Footer'
import PageContainer from 'client/PageContainer'
import { Link as ScrollLink, Element as ScrollElement } from 'react-scroll'
import { StickyContainer, Sticky } from 'react-sticky'

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
  color: ${theme.colors.grayDark};
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

const Trainings = styled.div`
  margin-top: 30px;
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
  color: ${theme.colors.grayDark};
  transition: transform 300ms;
  will-change: transform;

  &:hover {
    text-decoration: none;
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

export default graphql(gql`
  query paths {
    paths {
      id
      title
      color
      icon
      trainings {
        id
        title
        abstract
        icon
        link
        duration
        intraPrice
      }
    }
  }
`)(({ data }) =>
  <PageContainer>
    <Helmet>
      <title>Nos formations JavaScript</title>
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
              <Trainings>
                {path.trainings.map(training =>
                  <TrainingLink key={training.id} to={training.link}>
                    <TrainingCard {...training} path={path} />
                  </TrainingLink>,
                )}
              </Trainings>
            </PathBlock>,
          )}
      </Main>
    </Container>
    <Footer />
  </PageContainer>,
)
