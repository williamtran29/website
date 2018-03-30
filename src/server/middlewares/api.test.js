import express from 'express'
import request from 'supertest'
import { sendMail } from 'server/services/mailer'
import api from './api'

jest.mock('server/services/mailer')

describe('app', () => {
  let app

  beforeAll(() => {
    app = express()
    app.use(api)
  })

  describe('POST /api/contact', () => {
    it('should send an email', async () => {
      await request(app)
        .post('/contact')
        .send({
          name: 'Noël Flantier',
          company: 'SKEP',
          phone: '0606060606',
          email: 'hubert@oss117.com',
          message: 'Hello from the Caire',
        })
        .expect(200, { error: false })

      expect(sendMail).toHaveBeenCalledWith({
        from: 'hubert@oss117.com',
        subject: 'Noël Flantier nous a contactés sur smooth-code.com',
        textContent: `
Noël Flantier nous a contactés sur smooth-code.com

-----

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
