import {
  fetchUtils,
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
} from 'admin-on-rest'

const { queryParameters, fetchJson } = fetchUtils

/**
 * Maps admin-on-rest queries to a simple REST API
 *
 * The REST dialect is similar to the one of FakeRest
 * @see https://github.com/marmelab/FakeRest
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter={ids:[123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchJson) => {
  /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
  const convertRESTRequestToHTTP = (type, resource, params) => {
    let url = ''
    const options = {}

    // console.log(type)
    // console.log(resource)
    // console.log(params)

    switch (type) {
      case GET_LIST: {
        const { page, perPage } = params.pagination
        const { field, order } = params.sort
        const query = {
          rangeStart: JSON.stringify((page - 1) * perPage),
          rangeEnd: JSON.stringify(page * perPage - 1),
        }

        const sortKey = order === 'DESC' ? 'orderBy' : 'orderByDesc'
        query[sortKey] = field

        if (Object.keys(params.filter) > 0) {
          query.filter = Object.keys(params.filter).map(x => x)
        }

        url = `${apiUrl}/${resource}?${queryParameters(query)}`
        break
      }
      case GET_ONE:
        url = `${apiUrl}/${resource}/${params.id}`
        break
      case GET_MANY: {
        const query = {
          'id:in': JSON.stringify({ id: params.ids }),
        }
        url = `${apiUrl}/${resource}?${queryParameters(query)}`
        break
      }
      case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination
        const { field, order } = params.sort
        const query = {
          rangeStart: JSON.stringify((page - 1) * perPage),
          rangeEnd: JSON.stringify(page * perPage - 1),
          // filter: JSON.stringify({
          //   ...params.filter,
          //   [params.target]: params.id,
          // }),
        }

        const sortKey = order === 'DESC' ? 'orderBy' : 'orderByDesc'
        query[sortKey] = field
        url = `${apiUrl}/${resource}?${queryParameters(query)}`
        break
      }
      case UPDATE:
        url = `${apiUrl}/${resource}/${params.id}`
        options.method = 'PUT'
        options.body = JSON.stringify(params.data)
        break
      case CREATE:
        url = `${apiUrl}/${resource}`
        options.method = 'POST'
        options.body = JSON.stringify(params.data)
        break
      case DELETE:
        url = `${apiUrl}/${resource}/${params.id}`
        options.method = 'DELETE'
        break
      default:
        throw new Error(`Unsupported fetch action type ${type}`)
    }
    return { url, options }
  }

  /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} REST response
     */
  const convertHTTPResponseToREST = (response, type, resource, params) => {
    // const { json, headers } = response
    const json = response.json.results
    const headers = new Map([
      ['content-range', `${response.json.total} / ${response.json.total}`],
    ])
    switch (type) {
      case GET_ONE:
        return { data: response.json }
      case GET_LIST:
      case GET_MANY_REFERENCE:
        if (!headers.has('content-range')) {
          throw new Error(
            'The Content-Range header is missing in the HTTP Response. The simple REST client expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?',
          )
        }
        return {
          data: json,
          total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }
      case CREATE:
        return { data: { ...response.json } }
      case UPDATE:
        return { data: { ...response.json } }
      default:
        return { data: json }
    }
  }

  /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a REST response
     */
  return (type, resource, params) => {
    const { url, options } = convertRESTRequestToHTTP(type, resource, params)
    return httpClient(url, options).then(response =>
      convertHTTPResponseToREST(response, type, resource, params),
    )
  }
}
