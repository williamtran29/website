import BaseModel, { mergeSchemas } from 'server/models/BaseModel'

export default class Training extends BaseModel {
  static tableName = 'trainings'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['name'],
    properties: {
      name: { type: 'string' },
      duration: { type: 'integer' },
      abstract: { type: 'string ' },
      description: { type: 'string ' },
      cloudinary_id: { type: 'string ' },
      slug: { type: 'string ' },
    },
  })
}
