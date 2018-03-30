import http from 'http'
import chalk from 'chalk'
import config from 'server/config'
import app from 'server/app'
import { connect as connectDatabase } from 'server/services/database'
import { configure as configureMoment } from 'shared/moment'

configureMoment()

const server = http.createServer(app)

server.listen(config.get('server.port'), err => {
  if (err) {
    throw err
  }

  connectDatabase()

  // eslint-disable-next-line no-console
  console.info(
    chalk.blue(
      `🚀   Server started: http://localhost:${server.address().port}/`,
    ),
  )
})
