import * as ghostApi from 'server/ghost/ghostApi'
import generateRssFeed from './generateRssFeed'

jest.mock('server/ghost/ghostApi')

describe('#generateRssFeed', () => {
  beforeEach(async () => {
    ghostApi.getPosts.mockImplementation(async () => ({
      posts: [
        {
          link: '/articles/test',
          updated_at: '2018-01-05T12:51:20.199Z',
          tags: [{ name: 'React' }],
          author: { name: 'Greg' },
        },
        {
          link: '/articles/test2',
          updated_at: '2018-06-05T12:51:20.199Z',
          tags: [],
          author: { name: 'Greg' },
        },
      ],
    }))
  })

  it('should generate sitemap', async () => {
    const sitemap = await generateRssFeed()
    expect(sitemap).toMatch(/Greg/)
    expect(sitemap).toMatch(/articles\/test/)
  })
})
