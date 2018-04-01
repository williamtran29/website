import RSS from 'rss'
import { run } from 'server/graphql'
import { latestArticlesRoute } from 'shared/routePaths'
import { completeUrl } from 'shared/url'
import { absCl } from 'shared/cloudinary'

async function generateRss() {
  const data = await run(/* GraphQL */ `
    {
      articles {
        posts {
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
    }
  `)

  const feed = new RSS({
    title: 'Smooth Code',
    description: 'Actualité JavaScript, React et GraphQL.',
    generator: 'Smooth Code',
    feed_url: completeUrl('/feed.xml'),
    site_url: completeUrl(latestArticlesRoute()),
    image_url: absCl('ujjxt9mthnloobzvxfpa', 'q_auto'),
    managingEditor: 'contact@smooth-code.com',
    language: 'fr',
  })

  data.articles.posts.forEach(article =>
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
