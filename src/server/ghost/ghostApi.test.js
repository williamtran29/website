import * as ghostApi from './ghostApi'

describe('ghostApi', () => {
  describe('#get', () => {
    it('should return posts', async () => {
      const result = await ghostApi.get('posts')
      expect(result.posts).toBeDefined()
    })
  })
  describe('#getPosts', () => {
    it('should return the posts and their total number', async () => {
      const result = await ghostApi.getPosts()
      expect(result.posts).toBeDefined()
      expect(result.meta.pagination.total > 3).toBe(true)
    })
  })
})
