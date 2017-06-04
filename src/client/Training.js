import React from 'react'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import Header from 'client/Header'

export default graphql(
  gql`
  query Training($slug: String!) {
    training(slug: $slug) {
      id
      cloudinary_id
      name
      slug
    }
  }
`,
  {
    options: ({ match }) => ({
      variables: {
        slug: match.params.slug,
      },
    }),
  },
)(({ data }) =>
  <div>
    <Helmet>
      <title>Nos formations JavaScript</title>
    </Helmet>
    <Header />
    {data.training && data.training.name}
  </div>,
)
