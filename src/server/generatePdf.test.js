import { ReadStream } from 'fs'
import generatePdf from './generatePdf'

describe('generatePdf', () => {
  it('should generate a pdf', async () => {
    const pdf = await generatePdf('https://www.google.com')
    expect(pdf).toBeInstanceOf(ReadStream)
  })
})
