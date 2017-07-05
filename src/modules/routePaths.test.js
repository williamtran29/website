import { trainingRoute, trainingPdfRoute } from './routePaths'

describe('routePaths', () => {
  describe('#trainingRoute', () => {
    it('should return training route', () => {
      expect(trainingRoute('nodejs')).toBe('/trainings/nodejs')
      expect(trainingRoute('react')).toBe('/trainings/react')
    })
  })

  describe('#trainingRoute', () => {
    it('should return training pdf route', () => {
      expect(trainingPdfRoute('nodejs')).toBe('/trainings/nodejs/pdf')
      expect(trainingPdfRoute('react')).toBe('/trainings/react/pdf')
    })
  })
})
