import path from 'path'
import express from 'express'
import morgan from 'morgan'
import compression from 'compression'
import favicon from 'serve-favicon'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import config from 'server/config'
import ssr from 'server/middlewares/ssr'
import seo from 'server/middlewares/seo'
import api from 'server/middlewares/api'
import redirectBlog from 'server/middlewares/redirectBlog'
import { schema, rootValue } from 'server/graphql'

const app = express()

app.use(redirectBlog)
app.use(seo)
app.use('/api', api)
app.use(
  express.static(config.get('server.publicPath'), {
    immutable: true,
    maxage: 31536000000,
  }),
)

app.use(compression())

if (config.get('env') !== 'test') {
  app.use(morgan(config.get('server.logFormat')))
}

app.use(favicon(path.join(config.get('server.publicPath'), 'favicon.ico')))

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, rootValue }))

if (config.get('graphql.graphiql')) {
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
}

app.use(ssr)

export default app
