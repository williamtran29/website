import request from 'supertest'
import sendEmail from 'server/email/sendEmail'
import generateSitemap from 'server/generateSitemap'
import app from './app'

jest.mock('server/email/sendEmail')
jest.mock('server/generateSitemap')

describe('app', () => {
  let server

  beforeAll(() => {
    server = app.listen()
    generateSitemap.mockImplementation(async () => '<sitemap></sitemap>')
  })

  describe('GET /sitemap.xml', () => {
    it('should load sitemap', async () => {
      await request(server)
        .get('/sitemap.xml')
        .expect(200, '<sitemap></sitemap>')
    })
  })

  describe('POST /api/contact', () => {
    it('should send an email', async () => {
      await request(server)
        .post('/api/contact')
        .send({
          name: 'Noël Flantier',
          company: 'SKEP',
          phone: '0606060606',
          email: 'hubert@oss117.com',
          message: 'Hello from the Caire',
        })
        .expect(200, { error: false })

      expect(sendEmail).toHaveBeenCalledWith({
        from: 'hubert@oss117.com',
        subject: 'Nouveau message de Noël Flantier',
        textContent: `
Nom: Noël Flantier
Société: SKEP
Email: hubert@oss117.com
Téléphone: 0606060606

-----

Hello from the Caire
`,
        to: 'contact@smooth-code.com',
      })
    })
  })
})
