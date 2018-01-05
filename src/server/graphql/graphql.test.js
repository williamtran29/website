import { run } from './index.js'

describe('graphql', () => {
  describe('#articles', () => {
    it('just wait', async () => {
      const data = await run(/* GraphQL */ `
        {
          articles {
            posts {
              title
            }
            meta {
              pagination {
                limit
                page
                total
              }
            }
          }
        }
      `)
      expect(data.articles.posts).toBeDefined()
      expect(data.articles.meta.pagination.total > 3).toBe(true)
      expect(data.articles.meta.pagination.limit > 2).toBe(true)
      expect(data.articles.meta.pagination.page > 0).toBe(true)
    })
  })
})
