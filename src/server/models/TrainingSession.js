import BaseModel, { mergeSchemas } from 'server/models/BaseModel'
import moment from 'modules/moment'
import { sessionRoute } from 'modules/routePaths'

export default class TrainingSession extends BaseModel {
  static tableName = 'training_sessions'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['date', 'training_id', 'training_location_id'],
    properties: {
      date: { type: 'date' },
      training_id: { type: 'string' },
      training_location_id: { type: 'string' },
    },
  })

  static relationMappings = {
    training: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: 'Training',
      join: {
        from: 'training_sessions.training_id',
        to: 'trainings.id',
      },
    },
    location: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: 'TrainingLocation',
      join: {
        from: 'training_sessions.training_location_id',
        to: 'training_locations.id',
      },
    },
  }

  async link() {
    const training = await this.$relatedQuery('training')
    const location = await this.$relatedQuery('location')
    return sessionRoute(
      training.slug,
      this.id,
      location.city.toLowerCase(),
      moment.utc(this.start_date).format('MMMM'),
    )
  }

  location() {
    return this.$relatedQuery('location')
  }
}
