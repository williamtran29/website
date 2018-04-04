import sm from 'sitemap'
import _ from 'lodash'
import { run } from 'server/graphql'
import * as routePaths from 'shared/routePaths'

const siteMapToString = sitemap =>
  new Promise((resolve, reject) => {
    sitemap.toXML((err, xml) => {
      if (err) {
        reject(err)
        return
      }

      resolve(xml.toString())
    })
  })

async function generateSitemap() {
  const data = await run(/* GraphQL */ `
    query sitemap {
      trainings {
        updatedAt
        link
      }
      articles {
        posts {
          link
          updated_at
        }
      }
    }
  `)

  return siteMapToString(
    sm.createSitemap({
      hostname: 'https://www.smooth-code.com',
      cacheTime: 600000,
      urls: [
        { url: routePaths.homeRoute(), changefreq: 'weekly', priority: 1 },
        ..._.sortBy(data.trainings, 'updatedAt')
          .reverse()
          .map(training => ({
            url: training.link,
            lastmodISO: training.updatedAt,
            changefreq: 'weekly',
            priority: 0.9,
          })),
        ...data.articles.posts.map(article => ({
          url: article.link,
          lastmodISO: article.updated_at,
          changefreq: 'weekly',
          priority: 0.9,
        })),
      ],
    }),
  )
}

export default generateSitemap
