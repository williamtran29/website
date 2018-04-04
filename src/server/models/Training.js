import { trainingPrintRoute, trainingRoute } from 'shared/routePaths'
import BaseModel, { mergeSchemas } from './BaseModel'

export default class Training extends BaseModel {
  static tableName = 'trainings'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: [],
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
      duration: { type: 'integer' },
      pdf: { type: 'string' },
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
      modify: builder =>
        builder
          .whereRaw("training_sessions.start_date > now() + interval '1 day'")
          .orderBy('training_sessions.start_date', 'asc'),
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

  link() {
    return trainingRoute(this.slug)
  }

  printLink() {
    return trainingPrintRoute(this.slug)
  }

  nextSession() {
    if (!this.sessions) {
      throw new Error('sessions is missing')
    }

    return this.sessions.find(session => session.inStock())
  }
}
