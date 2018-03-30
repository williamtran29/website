/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Redirect } from 'react-router'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Status from 'client/components/Status'

const withTraining = graphql(
  gql`
    query trainingData($slug: String!) {
      training(slug: $slug) {
        sessions {
          link
        }
      }
    }
  `,
  {
    options: ({ match }) => ({ variables: { slug: match.params.slug } }),
  },
)

const Training = ({ data: { training } }) => {
  if (!training) return null
  const lastTraining = training.sessions[0]
  return (
    <Status code={302}>
      <Redirect to={lastTraining ? lastTraining.link : '/'} />
    </Status>
  )
}

export default withTraining(Training)
