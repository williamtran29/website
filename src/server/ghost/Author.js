/* eslint-disable camelcase */
import { trainerRoute } from 'modules/routePaths'
import Image from 'server/ghost/Image'
import Post from 'server/ghost/Post'

class Author {
  constructor(options) {
    Object.assign(this, options)

    if (this.profile_image) this.profile_image = new Image(this.profile_image)
    if (this.posts) this.posts = this.posts.map(post => new Post(post))
  }

  link() {
    return trainerRoute(this.slug)
  }
}

export default Author
