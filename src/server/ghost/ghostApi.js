import fetch from 'node-fetch'
import { format as formatUrl } from 'url'
import config from 'server/config'
import Post from 'server/ghost/Post'

const credentials = {
  client_id: config.get('ghost.clientId'),
  client_secret: config.get('ghost.clientSecret'),
}

export async function get(resource, query) {
  const url = formatUrl({
    protocol: 'https',
    hostname: config.get('ghost.host'),
    pathname: `/ghost/api/v0.1/${resource}`,
    query: { ...credentials, ...query },
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
  return result.posts.map(post => new Post(post))
}

export async function getPost(slug, options) {
  const result = await get(`posts/slug/${slug}`, options)
  return result.posts.map(post => new Post(post))[0]
}
