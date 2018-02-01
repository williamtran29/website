import fetch from 'node-fetch'
import { format as formatUrl } from 'url'
import config from 'server/config'
import Post from 'server/ghost/Post'
import Author from 'server/ghost/Author'

const credentials = {
  client_id: config.get('ghost.clientId'),
  client_secret: config.get('ghost.clientSecret'),
}

const filterUndefinedValues = object =>
  Object.keys(object).reduce(
    (result, field) =>
      object[field] !== undefined
        ? { ...result, [field]: object[field] }
        : result,
    {},
  )

export async function get(resource, query = {}) {
  const fields = filterUndefinedValues(query)
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
  if (!result.posts) return null
  return new Post(result.posts[0])
}

export async function getAuthor(slug, options) {
  const result = await get(`users/slug/${slug}`, options)
  return new Author(result.users[0])
}
