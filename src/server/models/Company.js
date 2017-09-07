import BaseModel, { mergeSchemas } from 'server/models/BaseModel'

export default class Company extends BaseModel {
  static tableName = 'companies'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['color', 'name', 'logo'],
    properties: {
      color: { type: 'string' },
      name: { type: 'string' },
      logo: { type: 'string' },
    },
  })

  static relationMappings = {
    testimonials: {
      relation: BaseModel.HasManyRelation,
      modelClass: 'Testimonial',
      join: {
        from: 'companies.id',
        to: 'testimonials.company_id',
      },
    },
  }
}
