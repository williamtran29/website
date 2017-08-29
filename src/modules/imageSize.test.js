import imageSize from './imageSize'

describe('imageSize', () => {
  it('should return image size from url', async () => {
    const dimensions = await imageSize(
      'https://res.cloudinary.com/smooth/image/upload/y3figlvh9alb8ku5vvpj.png',
    )
    expect(dimensions).toEqual({ width: 2200, height: 1280, type: 'png' })
  })
})
