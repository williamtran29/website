import { trainingRoute } from './routePaths'

describe('routePaths', () => {
  describe('#trainingRoute', () => {
    it('should return training route', () => {
      expect(trainingRoute('nodejs')).toBe('/trainings/nodejs')
      expect(trainingRoute('react')).toBe('/trainings/react')
    })
  })
})
