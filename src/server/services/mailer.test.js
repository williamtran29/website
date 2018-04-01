import nock from 'nock'
import { sendMail } from './mailer'

describe('mailer', () => {
  describe('#sendMail', () => {
    it('should send an email', async () => {
      const scope = nock('https://api.sendgrid.com')
        .post('/v3/mail/send', {
          from: { email: 'greg@smooth-code.com' },
          personalizations: [{ to: [{ email: 'contact@smooth-code.com' }] }],
          subject: 'Hello',
          content: [{ type: 'text/plain', value: 'My name is Gregd' }],
        })
        .reply(200)

      const response = await sendMail({
        from: 'greg@smooth-code.com',
        to: 'contact@smooth-code.com',
        subject: 'Hello',
        textContent: 'My name is Gregd',
      })

      expect(scope.isDone()).toBe(true)
      expect(response.statusCode).toBe(200)
    })
  })
})
