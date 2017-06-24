import sm from 'sitemap'
import Training from 'server/models/Training'

async function generateSitemap() {
  const trainings = await Training.query().orderBy('updated_at', 'desc')
  const sitemap = sm.createSitemap({
    hostname: 'https://www.smooth-code.com',
    cacheTime: 600000,
    urls: [
      { url: '/', changefreq: 'weekly', priority: 1 },
      { url: '/trainings', changefreq: 'weekly', priority: 0.8 },
      { url: '/story', priority: 0.6 },
      { url: '/contact', priority: 0.6 },
      ...trainings.map(training => ({
        url: `/trainings/${training.slug}`,
        lastmodISO: training.updated_at.toISOString(),
        changefreq: 'weekly',
        priority: 0.9,
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
