import BaseModel, { mergeSchemas } from 'server/models/BaseModel'

export default class Path extends BaseModel {
  static tableName = 'paths'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['title', 'color', 'icon'],
    properties: {
      rank: { type: 'integer' },
      title: { type: 'string' },
      color: { type: 'string' },
      icon: { type: 'string' },
    },
  })

  static relationMappings = {
    trainings: {
      relation: BaseModel.HasManyRelation,
      modelClass: 'Training',
      join: {
        from: 'paths.id',
        to: 'trainings.path_id',
      },
    },
  }
}
