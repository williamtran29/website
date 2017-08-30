import { gql } from 'react-apollo'

const ArticlesQuery = {
  fragments: {
    articleEssential: gql`
      fragment ArticleEssential on Article {
        id
        slug
        link
        title
        published_at
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
          link
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
