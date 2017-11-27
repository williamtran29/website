import path from 'path'
import Koa from 'koa'
import morgan from 'koa-morgan'
import favicon from 'koa-favicon'
import serve from 'koa-static'
import conditional from 'koa-conditional-get'
import etag from 'koa-etag'
import compress from 'koa-compress'
import bodyParser from 'koa-bodyparser'
import error from 'koa-error'
import Router from 'koa-router'
import mount from 'koa-mount'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'
import puppeteer from 'puppeteer'
import config from 'server/config'
import ssr from 'server/middlewares/ssr'
import redirect from 'server/middlewares/redirect'
import generateSitemap from 'server/generateSitemap'
import generateRssFeed from 'server/generateRssFeed'
import sendEmail from 'server/email/sendEmail'
import { schema, rootValue } from 'server/graphql'

const app = new Koa()
const router = new Router()

app.use(async (ctx, next) => {
  if (ctx.request.headers.host === 'blog.smooth-code.com') {
    ctx.status = 301
    ctx.redirect(`https://www.smooth-code.com${ctx.request.url}`)
  }
  await next()
})

app.use(
  redirect([
    {
      match: /^\/references$/,
      redirect: '/',
    },
    {
      match: /^\/contact$/,
      redirect: '/',
    },
    {
      match: /^\/formations$/,
      redirect: '/',
    },
    {
      match: /^\/formations\/nodejs/,
      redirect: '/',
    },
    {
      match: /^\/formations\/graphql/,
      redirect: '/formation-graphql-intense/fevrier-paris-44',
      status: 301,
    },
    {
      match: /^\/notre-histoire/,
      redirect: '/',
    },
    {
      match: /^\/formations\/soir-react/,
      redirect: '/formation-react-fondamental/decembre-paris-39',
      status: 301,
    },
    {
      match: /^\/formations\/react-redux/,
      redirect: '/formation-react-fondamental/decembre-paris-39',
      status: 301,
    },
    {
      match: /^\/formations\/javascript-es2017/,
      redirect: '/formation-javascript-moderne/janvier-paris-41',
      status: 301,
    },
    {
      match: /^\/creer-app-mac-avec-script-shell/,
      redirect: '/articles/creer-app-mac-avec-script-shell',
    },
    {
      match: /^\/developpez-plus-vite-avec-prettier/,
      redirect: '/articles/developpez-plus-vite-avec-prettier',
    },
    {
      match: /^\/pourquoi-react-est-il-si-populaire/,
      redirect: '/articles/pourquoi-react-est-il-si-populaire',
    },
    {
      match: /^\/articles\/la-license-de-react-est-il-une-menace/,
      redirect: '/articles/la-license-de-react-est-elle-une-menace',
    },
  ]),
)

router.get('/pdf', async ctx => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(
    'https://smooth-code-website.herokuapp.com/formation-javascript-moderne/janvier-paris-41',
    { waitUntil: 'networkidle2' },
  )
  ctx.type = 'pdf'
  ctx.attachment(`smooth-code.pdf`)
  ctx.body = await page.pdf({
    format: 'A4',
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px',
    },
  })

  await browser.close()
})

router.get('/sitemap.xml', async ctx => {
  ctx.response.type = 'xml'
  ctx.response.body = await generateSitemap()
})

router.get('/feed.xml', async ctx => {
  ctx.response.type = 'xml'
  ctx.response.body = await generateRssFeed()
})

router.post('/api/contact', async ctx => {
  const {
    name,
    company,
    email,
    phone,
    message,
    subject = `${ctx.request.body.name} nous a contactés sur smooth-code.com`,
  } = ctx.request.body
  await sendEmail({
    from: email,
    to: 'contact@smooth-code.com',
    subject,
    textContent: `
${subject}

-----

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
app.use(bodyParser())
app.use(serve(PUBLIC, { immutable: true, maxage: 31536000000 }))
app.use(compress({ filter: contentType => /text/i.test(contentType) }))
app.use(conditional())
app.use(etag())

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
