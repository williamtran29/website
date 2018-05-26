import { completeUrl } from './url'

describe('url', () => {
  describe('#completeUrl', () => {
    it('should write complete url', () => {
      expect(completeUrl('/foo/bar')).toBe(
        'https://www.smooth-code.com/foo/bar',
      )
    })
  })
})
