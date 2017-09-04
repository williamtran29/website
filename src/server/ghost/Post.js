/* eslint-disable camelcase */
import { articleRoute } from 'modules/routePaths'
import { rootValue } from 'server/graphql'
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

  async mainPath(...args) {
    if (this.tags.length === 0) return null
    const path = await rootValue
      .paths(...args)
      .limit(1)
      .where({ slug: this.tags[0].slug })
      .first()
    return path || null
  }
}

export default Post
