import React from 'react'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { clUrl } from 'modules/cloudinary'
import Header from 'client/Header'
import Card3D from 'client/Card3D'

export default graphql(gql`
  query Trainings {
    trainings {
      id
      cloudinary_id
      name
      slug
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
        <Link key={training.slug} to={`/trainings/${training.slug}`}>
          <Card3D background={clUrl(training.cloudinary_id)}>
            {training.name}
          </Card3D>
        </Link>,
      )}
  </div>,
)
