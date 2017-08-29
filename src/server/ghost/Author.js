/* eslint-disable camelcase */
import { trainerRoute } from 'modules/routePaths'
import Image from './Image'

class Author {
  constructor(options) {
    Object.assign(this, options)
    this.profile_image = new Image(options.profile_image)
  }

  link() {
    return trainerRoute(this.slug)
  }
}

export default Author
