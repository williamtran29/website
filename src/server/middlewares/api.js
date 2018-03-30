import { Router } from 'express'
import bodyParser from 'body-parser'
import { sendMail } from 'server/services/mailer'
import { getEmail } from 'server/emails/contact'
import { asyncMiddleware } from 'server/utils/express'

const router = new Router()

router.post(
  '/contact',
  bodyParser.json(),
  asyncMiddleware(async (req, res) => {
    const {
      name,
      company,
      email: from,
      phone,
      message,
      subject = `${req.body.name} nous a contactés sur smooth-code.com`,
    } = req.body
    await sendMail(getEmail({ from, subject, name, company, phone, message }))
    res.send({ error: false })
  }),
)

export default router
