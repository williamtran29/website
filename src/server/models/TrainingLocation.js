import BaseModel, { mergeSchemas } from 'server/models/BaseModel'

export default class TrainingLocation extends BaseModel {
  static tableName = 'training_locations'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['name', 'address', 'city', 'country'],
    properties: {
      name: { type: 'string' },
      address: { type: 'string' },
      city: { type: 'string' },
      country: { type: 'string' },
    },
  })

  static relationMappings = {
    sessions: {
      relation: BaseModel.HasManyRelation,
      modelClass: 'TrainingSession',
      join: {
        from: 'training_locations.id',
        to: 'training_sessions.training_location_id',
      },
    },
  }
}
