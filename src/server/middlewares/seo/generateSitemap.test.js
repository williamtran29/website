import useDatabase from 'testUtils/useDatabase'
import factory from 'testUtils/factory'
import * as ghostApi from 'server/ghost/ghostApi'
import generateSitemap from './generateSitemap'

jest.mock('server/ghost/ghostApi')

describe('#generateSitemap', () => {
  useDatabase()

  beforeEach(async () => {
    ghostApi.getPosts.mockImplementation(async () => ({
      posts: [
        {
          link: '/articles/test',
          updated_at: '2018-01-05T12:51:20.199Z',
        },
        {
          link: '/articles/test2',
          updated_at: '2018-06-05T12:51:20.199Z',
        },
      ],
    }))
    await factory.createMany('training', 5, {
      slug: factory.seq(),
      updated_at: factory.seq(i => `2017-01-01T0${i}:00:00.000Z`),
    })
  })

  it('should generate sitemap', async () => {
    const sitemap = await generateSitemap()
    expect(sitemap).toMatchSnapshot()
  })
})
