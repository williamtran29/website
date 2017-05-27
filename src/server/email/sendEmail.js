import sendgrid, { mail as helper } from 'sendgrid'
import config from 'server/config'

const sg = sendgrid(config.get('sendgrid.apiKey'))

async function sendEmail({ from, to, subject, textContent }) {
  const fromEmail = new helper.Email(from)
  const toEmail = new helper.Email(to)
  const content = new helper.Content('text/plain', textContent)
  const mail = new helper.Mail(fromEmail, subject, toEmail, content)
  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  })

  return sg.API(request)
}

export default sendEmail
