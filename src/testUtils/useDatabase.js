/* eslint-disable import/no-extraneous-dependencies */
import { truncate } from 'knex-scripts'
import Knex from 'knex'
import * as database from 'server/services/database'
import knexConfig from '../../knexfile'

function useDatabase() {
  beforeAll(async () => {
    const knex = database.connect()
    await knex.migrate.latest()
  })

  afterAll(async () => {
    await database.disconnect()
  })

  beforeEach(async () => {
    await truncate({ getKnex: () => Knex(knexConfig.test) })
  })
}

export default useDatabase
