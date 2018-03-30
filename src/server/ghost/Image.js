import { getSize } from 'server/utils/image'

class Image {
  constructor(url) {
    this.url = url
  }

  async getDimensions() {
    if (this.dimensions) return this.dimensions
    this.dimensions = getSize(this.url)
    return this.dimensions
  }

  async width() {
    return (await this.getDimensions()).width
  }

  async height() {
    return (await this.getDimensions()).height
  }
}

export default Image
