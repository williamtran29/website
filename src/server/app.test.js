import request from 'supertest'
import sendEmail from 'server/email/sendEmail'
import app from './app'

jest.mock('server/email/sendEmail')

describe('app', () => {
  let server

  beforeAll(() => {
    server = app.listen()
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
