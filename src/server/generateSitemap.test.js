import { useDatabase } from 'server/testUtils'
import * as database from 'server/services/database'
import generateSitemap from './generateSitemap'

describe('#generateSitemap', () => {
  useDatabase()

  beforeEach(async () => {
    const knex = database.connect()
    await knex('trainings').update({
      updated_at: '2017-01-01T00:00:00.000Z',
    })
  })

  it('should generate sitemap', async () => {
    const sitemap = await generateSitemap()
    expect(sitemap).toMatchSnapshot()
  })
})
