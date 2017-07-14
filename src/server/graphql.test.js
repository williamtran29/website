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
            sessions {
              start_date
              location {
                name
                city
              }
            }
          }
        }`,
        rootValue,
      )

      expect(result).toMatchSnapshot()
    })

    it('should return custom training', async () => {
      const result = await graphql(
        schema,
        `{
          training(slug: "formation-nodejs") {
            trainers {
              fullName
            }
          }
        }`,
        rootValue,
      )

      expect(result).toMatchSnapshot()
    })

    it('should return custom trainer', async () => {
      const result = await graphql(
        schema,
        `{
          trainer(slug: "greg-berge") {
            fullName
          }
        }`,
        rootValue,
      )

      expect(result).toMatchSnapshot()
    })
  })
})
