import React from 'react'
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
    <Header />
    {data.trainings &&
      data.trainings.map(training =>
        <div key={training.name}>{training.name}</div>,
      )}
  </div>,
)
