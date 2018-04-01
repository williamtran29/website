import { firstLetterUpperCase } from './string'

describe('string', () => {
  describe('#firstLetterUpperCase', () => {
    it('should put first letter in upper case', () => {
      expect(firstLetterUpperCase('hello')).toBe('Hello')
    })
  })
})
