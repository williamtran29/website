import { Router } from 'express'
import { asyncMiddleware } from 'server/utils/express'
import generateSitemap from './generateSitemap'
import generateRssFeed from './generateRssFeed'

const router = new Router()

router.get(
  '/sitemap.xml',
  asyncMiddleware(async (req, res) => {
    res.type('xml')
    res.send(await generateSitemap())
  }),
)

router.get(
  '/feed.xml',
  asyncMiddleware(async (req, res) => {
    res.type('xml')
    res.send(await generateRssFeed())
  }),
)

export default router
