import { run } from './index.js'

describe('graphql', () => {
  describe('#articles', () => {
    it('should return meta and posts', async () => {
      const data = await run(/* GraphQL */ `
        {
          articles(limit: 15, page: 1) {
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
      expect(data.articles.meta.pagination.total).toBeGreaterThan(3)
      expect(data.articles.meta.pagination.limit).toBeGreaterThan(2)
      expect(data.articles.meta.pagination.page).toBeGreaterThan(0)
    })
    it('should be possible to paginate it', async () => {
      const page1 = await run(/* GraphQL */ `
        {
          articles(limit: 3, page: 1) {
            posts {
              title
            }
            meta {
              pagination {
                limit
                page
              }
            }
          }
        }
      `)
      const page2 = await run(/* GraphQL */ `
        {
          articles(limit: 2, page: 2) {
            posts {
              title
            }
            meta {
              pagination {
                limit
                page
              }
            }
          }
        }
      `)
      expect(page1.articles.posts).toHaveLength(3)
      expect(page1.articles.meta.pagination.page).toBe(1)
      expect(page1.articles.meta.pagination.limit).toBe(3)
      expect(page2.articles.meta.pagination.page).toBe(2)
      expect(page1.articles.meta.pagination.limit).toBe(3)
      expect(page1.articles.posts[2].title).toBe(page2.articles.posts[0].title)
    })
  })
})
