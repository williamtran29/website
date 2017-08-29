import { gql } from 'react-apollo'

const ArticlesQuery = {
  fragments: {
    articleEssential: gql`
      fragment ArticleEssential on Article {
        slug
        link
        title
        feature_image {
          url
        }
        custom_excerpt
        author {
          slug
          name
          profile_image {
            url
          }
        }
        tags {
          slug
          name
        }
      }
    `,
  },
}

export default ArticlesQuery
