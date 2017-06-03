import { graphql } from 'graphql'
import { useDatabase } from 'server/testUtils'
import { schema, rootValue } from 'server/graphql'

describe('graphql', () => {
  useDatabase()

  describe('trainings', () => {
    it('should return trainings', async () => {
      const result = await graphql(
        schema,
        `{
          trainings {
            abstract
            cloudinary_id
            description
            duration
            name
          }
        }`,
        rootValue,
      )

      expect(result).toMatchSnapshot()
    })
  })
})
