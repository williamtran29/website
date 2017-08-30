import { useDatabase, factory } from 'server/test'
import * as ghostApi from 'server/ghost/ghostApi'
import generateSitemap from './generateSitemap'

jest.mock('server/ghost/ghostApi')

describe('#generateSitemap', () => {
  useDatabase()

  beforeEach(async () => {
    ghostApi.getPosts = () => []
    const paths = await factory.createMany('path', 5, [{ title: 'JavaScript' }])
    await factory.createMany('training', 5, {
      slug: factory.seq(),
      updated_at: factory.seq(i => `2017-01-01T0${i}:00:00.000Z`),
      path_id: paths[0].id,
    })
  })

  it('should generate sitemap', async () => {
    const sitemap = await generateSitemap()
    expect(sitemap).toMatchSnapshot()
  })
})
