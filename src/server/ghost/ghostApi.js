import fetch from 'node-fetch'
import { format as formatUrl } from 'url'
import config from 'server/config'
import Post from 'server/ghost/Post'
import Author from 'server/ghost/Author'

const credentials = {
  client_id: config.get('ghost.clientId'),
  client_secret: config.get('ghost.clientSecret'),
}

export async function get(resource, query = {}) {
  const fields = Object.keys(query).reduce((accu, field) => {
    if (query[field] !== undefined) {
      return Object.assign(accu, { [field]: query[field] })
    }
    return accu
  }, {})
  const url = formatUrl({
    protocol: 'https',
    hostname: config.get('ghost.host'),
    pathname: `/ghost/api/v0.1/${resource}/`,
    query: { ...credentials, ...fields },
  })

  const result = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  })

  return result.json()
}

export async function getPosts(options) {
  const result = await get('posts', options)
  return {
    ...result,
    posts: result.posts.map(post => new Post(post)),
  }
}

export async function getPost(slug, options) {
  const result = await get(`posts/slug/${slug}`, options)
  return new Post(result.posts[0])
}

export async function getAuthor(slug, options) {
  const result = await get(`users/slug/${slug}`, options)
  return new Author(result.users[0])
}
