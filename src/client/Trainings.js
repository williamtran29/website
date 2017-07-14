import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import TrainingList from 'modules/components/TrainingList'
import Header from 'client/Header'
import Footer from 'client/Footer'
import PageContainer from 'client/PageContainer'

const Container = styled.div`
  flex: 1;
  max-width: 1000px;
  width: 100%;
  margin: 40px auto 100px;
`

export default graphql(gql`
  query trainings {
    trainings {
      cloudinary_id
      name
      abstract
      duration
      slug
      color
      price
    }
  }
`)(({ data }) =>
  <PageContainer>
    <Helmet>
      <title>Nos formations JavaScript</title>
    </Helmet>
    <Header />
    <Container>
      <TrainingList trainings={data.trainings} />
    </Container>
    <Footer />
  </PageContainer>,
)
