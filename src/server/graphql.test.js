import { graphql } from 'graphql'
import { useDatabase, factory } from 'server/test'
import { schema, rootValue } from 'server/graphql'

const gql = lines => graphql(schema, lines.join(''), rootValue)

describe('graphql', () => {
  useDatabase()

  describe('paths', () => {
    beforeEach(async () => {
      const paths = await factory.createMany('path', 5, [
        { title: 'JavaScript' },
      ])
      await factory.createMany('training', 5, {
        path_id: paths[0].id,
      })
    })

    it('should return path without trainings', async () => {
      const result = await gql`
        {
          paths {
            title
          }
        }
      `

      expect(result.data.paths[0].title).toBe('JavaScript')
    })

    it('should return path with trainings', async () => {
      const result = await gql`
        {
          paths {
            title
            trainings {
              title
              duration
            }
          }
        }
      `

      expect(result.data.paths[0].trainings.length).toBe(5)
    })
  })
})
