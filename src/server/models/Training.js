import BaseModel, { mergeSchemas } from 'server/models/BaseModel'
import { clUrl } from 'modules/cloudinary'

export default class Training extends BaseModel {
  static tableName = 'trainings'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: [
      'name',
      'duration',
      'price',
      'abstract',
      'color',
      'description',
      'outline',
      'cloudinary_id',
      'slug',
    ],
    properties: {
      name: { type: 'string' },
      duration: { type: 'integer' },
      price: { type: 'integer' },
      abstract: { type: 'string ' },
      color: { type: 'string ' },
      description: { type: 'string ' },
      outline: { type: 'string ' },
      cloudinary_id: { type: 'string ' },
      og_cloudinary_id: { type: 'string ' },
      slug: { type: 'string ' },
    },
  })

  static relationMappings = {
    sessions: {
      relation: BaseModel.HasManyRelation,
      modelClass: 'TrainingSession',
      join: {
        from: 'trainings.id',
        to: 'training_sessions.training_id',
      },
    },
    trainers: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: 'Trainer',
      join: {
        from: 'trainings.id',
        through: {
          from: 'trainings_trainers.training_id',
          to: 'trainings_trainers.trainer_id',
        },
        to: 'trainers.id',
      },
    },
  }

  async siblings() {
    return Training.query()
      .whereNot({ id: this.id })
      .orderByRaw('random()')
      .limit(2)
  }

  async sessions() {
    return this.$relatedQuery('sessions')
      .whereRaw("start_date > now() + interval '1 day'")
      .orderBy('start_date', 'asc')
      .limit(3)
  }

  async trainers() {
    return this.$relatedQuery('trainers')
  }

  ogImageUrl() {
    const cloudinaryId = this.og_cloudinary_id || this.cloudinary_id
    return clUrl(cloudinaryId, 'c_scale,w_1200')
  }
}
