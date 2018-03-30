import express from 'express'
import request from 'supertest'
import generateSitemap from './generateSitemap'
import seo from './'

jest.mock('./generateSitemap')

describe('seo', () => {
  let app

  beforeAll(() => {
    app = express()
    app.use(seo)
    generateSitemap.mockImplementation(async () => '<sitemap></sitemap>')
  })

  describe('GET /sitemap.xml', () => {
    it('should load sitemap', async () => {
      await request(app)
        .get('/sitemap.xml')
        .expect(200, '<sitemap></sitemap>')
    })
  })
})
