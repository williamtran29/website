import path from 'path'
import Koa from 'koa'
import morgan from 'koa-morgan'
import favicon from 'koa-favicon'
import send from 'koa-send'
import etag from 'koa-etag'
import compress from 'koa-compress'
import bodyParser from 'koa-bodyparser'
import error from 'koa-error'
import Router from 'koa-router'
import mount from 'koa-mount'
import auth from 'koa-basic-auth'
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa'
import config from 'server/config'
import ssr from 'server/ssr'
import sendEmail from 'server/email/sendEmail'
import { schema, rootValue } from 'server/graphql'

const app = new Koa()
const router = new Router()

router.post('/api/contact', async ctx => {
  const { name, company, email, phone, message } = ctx.request.body
  await sendEmail({
    from: email,
    to: 'contact@smooth-code.com',
    subject: `Nouveau message de ${name}`,
    textContent: `
Nom: ${name}
Société: ${company}
Email: ${email}
Téléphone: ${phone}

-----

${message}
`,
  })
  ctx.body = { error: false }
})

const PUBLIC = path.join(__dirname, '../../public')

app.use(error())

if (config.get('server.auth.enabled')) {
  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      if (err.status === 401) {
        ctx.status = 401
        ctx.set('WWW-Authenticate', 'Basic')
        ctx.body = 'Come back soon...'
      } else {
        throw err
      }
    }
  })

  app.use(
    auth({
      name: config.get('server.auth.username'),
      pass: config.get('server.auth.password'),
    }),
  )
}

app.use(bodyParser())
app.use(etag())
app.use(async (ctx, next) => {
  await next()
  await send(ctx, ctx.path, {
    root: PUBLIC,
    immutable: true,
    maxage: 31536000000,
  })
})
app.use(compress({ filter: contentType => /text/i.test(contentType) }))

if (config.get('env') !== 'test') {
  app.use(morgan(config.get('server.logFormat')))
}

app.use(favicon(path.join(PUBLIC, 'favicon.ico')))
app.use(router.routes())
app.use(
  mount(
    '/graphql',
    graphqlKoa({
      schema,
      rootValue,
    }),
  ),
)
app.use(mount('/graphiql', graphiqlKoa({ endpointURL: '/graphql' })))
app.use(ssr())

export default app
