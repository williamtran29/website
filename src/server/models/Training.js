import BaseModel, { mergeSchemas } from 'server/models/BaseModel'

export default class Training extends BaseModel {
  static tableName = 'trainings'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['title', 'icon', 'slug'],
    properties: {
      rank: { type: 'integer' },
      title: { type: 'string' },
      abstract: { type: 'string' },
      objectives: { type: 'string' },
      prerequisites: { type: 'string' },
      icon: { type: 'string' },
      color: { type: 'string' },
      slug: { type: 'string' },
      social_icon: { type: 'string' },
      social_title: { type: 'string' },
      social_abstract: { type: 'string' },
      price: { type: 'integer' },
      courses: { type: 'array' },
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

  updatedAt() {
    return this.updated_at
  }

  socialTitle() {
    return this.social_title || this.title
  }

  socialAbstract() {
    return this.social_abstract || this.abstract
  }
}
