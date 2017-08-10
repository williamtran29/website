import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import TrainingCard from 'modules/components/TrainingCard'
import Header from 'client/Header'
import Footer from 'client/Footer'
import PageContainer from 'client/PageContainer'

const Container = styled.div`
  flex: 1;
  max-width: 1000px;
  width: 100%;
  margin: 60px auto 100px;
  display: flex;
`

const Sidebar = styled.div`
  width: 200px;
  border-right: 1px solid #e5e5e5;
  padding: 40px 0 0 20px;
`

const SidebarTitle = styled.h3`
  font-size: 24px;
  font-weight: 400;
  line-height: 30px;
`

const SidebarNav = styled.nav`margin-top: 40px;`
const SidebarNavList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`
const SidebarNavItem = styled.li`
  font-size: 18px;
  line-height: 20px;
  height: 20px;
  border-left: 3px solid #fff;
  padding-left: 10px;
  margin-bottom: 16px;
`

const Main = styled.section`
  flex: 1;
  padding: 30px 0 0 40px;
`
const PathBlock = styled.div`margin-bottom: 90px;`
const PathTitle = styled.h2`
  font-size: 34px;
  font-weight: 300;
  line-height: 40px;
  margin-bottom: 10px;
`
const PathColorLine = styled.div`
  width: 30px;
  height: 3px;
`

const Trainings = styled.div`
  margin-top: 30px;
  display: flex;
`

const TrainingCardContainer = styled.div`
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
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
        <SidebarTitle>Explorer</SidebarTitle>
        {data.paths &&
          <SidebarNav>
            <SidebarNavList>
              {data.paths.map(path =>
                <SidebarNavItem
                  key={path.id}
                  style={{ borderLeftColor: path.color }}
                >
                  {path.title}
                </SidebarNavItem>,
              )}
            </SidebarNavList>
          </SidebarNav>}
      </Sidebar>
      <Main>
        {data.paths &&
          data.paths.map(path =>
            <PathBlock key={path.id}>
              <PathTitle>
                {path.title}
              </PathTitle>
              <PathColorLine style={{ backgroundColor: path.color }} />
              <Trainings>
                {path.trainings.map(training =>
                  <TrainingCardContainer key={training.id}>
                    <TrainingCard {...training} path={path} />
                  </TrainingCardContainer>,
                )}
              </Trainings>
            </PathBlock>,
          )}
      </Main>
    </Container>
    <Footer />
  </PageContainer>,
)
