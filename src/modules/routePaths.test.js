import { trainingRoute } from './routePaths'

describe('routePaths', () => {
  describe('#trainingRoute', () => {
    it('should return training route', () => {
      expect(trainingRoute('nodejs')).toBe('/formations/nodejs')
      expect(trainingRoute('react')).toBe('/formations/react')
    })
  })
})
