import sm from 'sitemap'
import Training from 'server/models/Training'
import TrainingSession from 'server/models/TrainingSession'
import { trainingRoute } from 'modules/routePaths'

async function generateSitemap() {
  const trainings = await Training.query().orderByRaw(
    'updated_at desc, id desc',
  )
  const sessions = await TrainingSession.query()
    .eager('[training, location]')
    .whereRaw("start_date > now() + interval '14 day'")
    .orderBy('start_date', 'desc')
  const sessionLinks = await Promise.all(
    sessions.map(session => session.link()),
  )

  const sitemap = sm.createSitemap({
    hostname: 'https://www.smooth-code.com',
    cacheTime: 600000,
    urls: [
      { url: '/', changefreq: 'weekly', priority: 1 },
      { url: '/trainings', changefreq: 'weekly', priority: 0.8 },
      { url: '/story', priority: 0.6 },
      { url: '/contact', priority: 0.6 },
      ...trainings.map(training => ({
        url: trainingRoute(training.slug),
        lastmodISO: training.updated_at.toISOString(),
        changefreq: 'weekly',
        priority: 0.9,
      })),
      ...sessions.map((session, index) => ({
        url: sessionLinks[index],
        lastmodISO: session.updated_at.toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      })),
    ],
  })

  return new Promise((resolve, reject) => {
    sitemap.toXML((err, xml) => {
      if (err) {
        reject(err)
        return
      }

      resolve(xml.toString())
    })
  })
}

export default generateSitemap
