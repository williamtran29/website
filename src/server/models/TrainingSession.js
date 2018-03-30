import slug from 'slug'
import moment from 'moment'
import { sessionRoute } from 'shared/routePaths'
import BaseModel, { mergeSchemas } from './BaseModel'

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
      modify: builder => builder.where('trainings.live', true),
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

  updatedAt() {
    return this.updated_at
  }

  link() {
    if (!this.training || !this.location)
      throw new Error('"training" and "location" must be loaded to get "link".')

    return sessionRoute(
      this.training.slug,
      slug(moment.utc(this.start_date).format('MMMM')),
      slug(this.location.city.toLowerCase()),
      this.id,
    )
  }

  startDate() {
    return this.start_date
  }

  endDate() {
    return this.end_date
  }

  validFrom() {
    return this.created_at
  }

  inStock() {
    return this.participants < 10
  }
}
