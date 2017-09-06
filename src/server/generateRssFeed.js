import RSS from 'rss'
import { gql } from 'server/graphql'
import * as routePaths from 'modules/routePaths'

async function generateRss() {
  const { data, errors } = await gql`
    {
      articles {
        title
        link
        updated_at
        author {
          name
        }
        tags {
          name
        }
        feature_image {
          url
        }
      }
    }
  `

  if (errors) {
    console.error(errors) // eslint-disable-line no-console
    throw new Error('Error during rss generation')
  }

  const feed = new RSS({
    title: 'Smooth actualité',
    description: 'Actualité de JavaScript, React et Node.js.',
    generator: 'Smooth actualité',
    feed_url: `https://www.smooth-code.com/rss.xml`,
    site_url: `https://www.smooth-code.com${routePaths.articlesRoute()}`,
    image_url:
      'http://res.cloudinary.com/smooth/image/upload/v1504009141/ujjxt9mthnloobzvxfpa.png',
    managingEditor: 'jeremy@smooth-code.com (Jeremy Sfez)',
    language: 'fr',
  })

  data.articles.forEach(article =>
    feed.item({
      title: article.title,
      description: article.custom_excerpt,
      url: `https://www.smooth-code.com${article.link}`,
      categories: article.tags.map(tag => tag.name),
      author: article.author.link,
      date: article.published_at,
    }),
  )

  return feed.xml()
}

export default generateRss
