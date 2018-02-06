/* eslint-disable import/no-extraneous-dependencies */
import { truncate } from 'knex-scripts'
import knex from 'knex'
import * as database from 'server/services/database'
import knexConfig from '../../../knexfile'

function useDatabase() {
  beforeAll(async () => {
    database.connect()
  })

  afterAll(async () => {
    await database.disconnect()
  })

  beforeEach(async () => {
    await truncate({ getKnex: () => knex(knexConfig.test) })
  })
}

export default useDatabase
