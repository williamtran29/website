import BaseModel, { mergeSchemas } from 'server/models/BaseModel'
import { trainerRoute } from 'modules/routePaths'
import * as ghostApi from 'server/ghost/ghostApi'

export default class Trainer extends BaseModel {
  static tableName = 'trainers'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['first_name', 'last_name', 'description', 'slug', 'picture'],
    properties: {
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      description: { type: 'string' },
      slug: { type: 'string' },
      picture: { type: 'string ' },
    },
  })

  static relationMappings = {
    trainings: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: 'Training',
      join: {
        from: 'trainers.id',
        through: {
          from: 'trainings_trainers.trainer_id',
          to: 'trainings_trainers.training_id',
        },
        to: 'trainings.id',
      },
    },
  }

  fullName() {
    return `${this.first_name} ${this.last_name}`
  }

  link() {
    return trainerRoute(this.slug)
  }

  async articles() {
    return ghostApi.getPosts({
      filter: `author:${this.slug}`,
      include: 'author,tags',
    })
  }
}
