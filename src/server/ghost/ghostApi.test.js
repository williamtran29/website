import * as ghostApi from './ghostApi'

describe('ghostApi', () => {
  describe('#get', () => {
    it('should return posts', async () => {
      const result = await ghostApi.get('posts')
      expect(result.posts).toBeDefined()
    })
  })
})
