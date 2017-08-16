import sm from 'sitemap'
import { gql } from 'server/graphql'
import * as routePaths from 'modules/routePaths'

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
  const { data, errors } = await gql`
    {
      trainings {
        updatedAt
        link
      }
      trainingSessions {
        updatedAt
        link
      }
    }
  `

  if (errors) {
    console.error(errors) // eslint-disable-line no-console
    throw new Error('Error during sitemap generation')
  }

  return siteMapToString(
    sm.createSitemap({
      hostname: 'https://www.smooth-code.com',
      cacheTime: 600000,
      urls: [
        { url: routePaths.homeRoute(), changefreq: 'weekly', priority: 1 },
        {
          url: routePaths.trainingsRoute(),
          changefreq: 'weekly',
          priority: 0.8,
        },
        { url: routePaths.storyRoute(), priority: 0.6 },
        { url: routePaths.contactRoute(), priority: 0.6 },
        ...data.trainings.map(training => ({
          url: training.link,
          lastmodISO: training.updatedAt,
          changefreq: 'weekly',
          priority: 0.9,
        })),
        ...data.trainingSessions.map(session => ({
          url: session.link,
          lastmodISO: session.updatedAt,
          changefreq: 'weekly',
          priority: 0.7,
        })),
      ],
    }),
  )
}

export default generateSitemap
