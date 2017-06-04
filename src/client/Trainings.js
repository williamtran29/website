import React from 'react'
import { Helmet } from 'react-helmet'
import Header from 'client/Header'
import { gql, graphql } from 'react-apollo'

export default graphql(gql`
  query Trainings {
    trainings {
      name
    }
  }
`)(({ data }) =>
  <div>
    <Helmet>
      <title>Nos formations JavaScript</title>
    </Helmet>
    <Header />
    {data.trainings &&
      data.trainings.map(training =>
        <div key={training.name}>{training.name}</div>,
      )}
  </div>,
)
