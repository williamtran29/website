import * as ghostApi from './ghostApi'

describe('ghostApi', () => {
  describe('#get', () => {
    it('should return posts', async () => {
      const result = await ghostApi.get('posts')
      expect(result.posts).toBeDefined()
    })

    it('should filter undefined parameters', async () => {
      const result = await ghostApi.get('posts', {
        limit: undefined,
        page: undefined,
      })
      expect(result.posts).toBeDefined()
    })
  })
  describe('#getPosts', () => {
    it('should return the posts and their total number', async () => {
      const result = await ghostApi.getPosts()
      expect(result.posts).toBeDefined()
      expect(result.meta.pagination.total).toBeGreaterThan(5)
    })

    it('should be possible to paginate it', async () => {
      const result = await ghostApi.getPosts({ limit: 2 })
      expect(result.posts).toHaveLength(2)
      expect(result.meta.pagination.limit).toBe(2)
      expect(result.meta.pagination.total).toBeGreaterThan(5)
    })
  })
})
