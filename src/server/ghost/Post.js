/* eslint-disable camelcase */
import { articleRoute } from 'shared/routePaths'
import Author from 'server/ghost/Author'
import Image from 'server/ghost/Image'

class Post {
  constructor(options) {
    Object.assign(this, options)
    if (this.author) this.author = new Author(options.author)
    if (this.feature_image)
      this.feature_image = new Image(options.feature_image)
  }

  link() {
    return articleRoute(this.slug)
  }
}

export default Post
