import BaseModel, { mergeSchemas } from 'server/models/BaseModel'

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
  }

  async siblings() {
    return Training.query()
      .whereNot({ id: this.id })
      .orderByRaw('random()')
      .limit(2)
  }

  async sessions() {
    return this.$relatedQuery('sessions')
  }
}
