import BaseModel, { mergeSchemas } from 'server/models/BaseModel'

export default class Testimonial extends BaseModel {
  static tableName = 'testimonials'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['color', 'name', 'logo'],
    properties: {
      rank: { type: 'integer' },
      text: { type: 'string' },
      avatar: { type: 'string' },
      name: { type: 'string' },
      title: { type: 'string' },
      featured: { type: 'boolean' },
    },
  })

  static relationMappings = {
    company: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: 'Company',
      join: {
        from: 'testimonials.company_id',
        to: 'companies.id',
      },
    },
  }
}
