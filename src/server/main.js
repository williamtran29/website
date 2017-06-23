import 'regenerator-runtime/runtime'
import http from 'http'
import * as database from 'server/services/database'
import config from 'server/config'
import app from 'server/app'

const server = http.createServer(app.callback())

server.listen(config.get('server.port'), err => {
  if (err) {
    throw err
  }

  // eslint-disable-next-line no-console
  console.info(
    `${Date(Date.now())}: http://localhost:${server.address().port}/`,
  )
})

database.connect()
