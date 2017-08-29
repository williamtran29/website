/* eslint-disable camelcase */
import { articleRoute } from 'modules/routePaths'
import Author from './Author'
import Image from './Image'

class Post {
  constructor(options) {
    Object.assign(this, options)
    this.author = new Author(options.author)
    this.feature_image = new Image(options.feature_image)
  }

  link() {
    return articleRoute(this.slug)
  }
}

export default Post
