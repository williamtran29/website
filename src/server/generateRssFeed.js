import RSS from 'rss'
import { gql } from 'server/graphql'
import { articlesRoute } from 'modules/routePaths'
import { completeUrl } from 'modules/urlUtil'
import { absClUrl } from 'modules/cloudinary'

async function generateRss() {
  const { data, errors } = await gql`
    {
      articles {
        title
        link
        published_at
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
    title: 'Smooth Code',
    description: 'Actualité JavaScript, React et GraphQL.',
    generator: 'Smooth Code',
    feed_url: completeUrl('/feed.xml'),
    site_url: completeUrl(articlesRoute()),
    image_url: absClUrl('ujjxt9mthnloobzvxfpa', 'q_auto'),
    managingEditor: 'contact@smooth-code.com',
    language: 'fr',
  })

  data.articles.forEach(article =>
    feed.item({
      title: article.title,
      description: article.custom_excerpt,
      url: completeUrl(article.link),
      categories: article.tags.map(tag => tag.name),
      author: article.author.name,
      date: article.published_at,
    }),
  )

  return feed.xml()
}

export default generateRss
