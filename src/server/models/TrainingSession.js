import slug from 'slug'
import BaseModel, { mergeSchemas } from 'server/models/BaseModel'
import moment from 'modules/moment'
import { sessionRoute } from 'modules/routePaths'
import { longHumanizeDate } from 'modules/dateUtils'

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

  updatedAt() {
    return this.updated_at
  }

  link() {
    if (!this.training || !this.location)
      throw new Error('"training" and "location" must be loaded to get "link".')

    return sessionRoute(
      this.training.slug,
      this.id,
      slug(this.location.city.toLowerCase()),
      slug(moment.utc(this.start_date).format('MMMM')),
    )
  }

  startDate() {
    return this.start_date
  }

  endDate() {
    return this.end_date
  }

  humanizedPeriod() {
    return longHumanizeDate({
      startDate: this.start_date,
      endDate: this.end_date,
    })
  }

  title() {
    if (!this.training) {
      throw new Error('"training" must be loaded to get "title".')
    }
    return `Formation "${this.training.title}" du ${this.humanizedPeriod()}`
  }

  abstract() {
    if (!this.training) {
      throw new Error('"training" must be loaded to get "abstract".')
    }
    return `Inscrivez-vous pour la formation ${this.training
      .title} du ${this.humanizedPeriod()}.`
  }

  validFrom() {
    return this.created_at
  }

  inStock() {
    return this.participants < 10
  }
}
