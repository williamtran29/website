import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
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

const Main = styled.section`
  flex: 1;
  padding: 0 20px 40px;

  @media (min-width: ${theme.medias.phablet}) {
    padding: 0 0 0 40px;
  }
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
`)(({ data }) => (
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
      <Main>
        <Title>Nos formations</Title>
        {data.paths && (
          <TrainingList
            trainings={data.paths.reduce(
              (all, path) => [...all, ...path.trainings],
              [],
            )}
          />
        )}
      </Main>
      {data.paths && (
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
        </JsonLd>
      )}
    </Container>
    <Footer />
  </PageContainer>
))
