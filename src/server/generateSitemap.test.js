import { useDatabase, factory } from 'server/test'
import generateSitemap from './generateSitemap'

describe('#generateSitemap', () => {
  useDatabase()

  beforeEach(async () => {
    const paths = await factory.createMany('path', 5, [{ title: 'JavaScript' }])
    await factory.createMany('training', 5, {
      slug: factory.seq(),
      updated_at: '2017-01-01T00:00:00.000Z',
      path_id: paths[0].id,
    })
  })

  it('should generate sitemap', async () => {
    const sitemap = await generateSitemap()
    expect(sitemap).toMatchSnapshot()
  })
})
