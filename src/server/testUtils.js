import * as database from 'server/services/database'

export const useDatabase = () => {
  let knex

  beforeAll(async () => {
    knex = database.connect()
  })

  afterAll(async () => {
    await database.disconnect()
  })

  beforeEach(async () => {
    await knex.seed.run()
  })
}
