import { trainingRoute } from 'modules/routePaths'
import BaseModel, { mergeSchemas } from 'server/models/BaseModel'
import { clUrl } from 'modules/cloudinary'

export default class Training extends BaseModel {
  static tableName = 'trainings'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['title', 'icon', 'slug'],
    properties: {
      rank: { type: 'integer' },
      title: { type: 'string' },
      abstract: { type: 'string' },
      description: { type: 'string' },
      objectives: { type: 'string' },
      prerequisites: { type: 'string' },
      icon: { type: 'string' },
      slug: { type: 'string' },
      social_icon: { type: 'string' },
      social_title: { type: 'string' },
      social_abstract: { type: 'string' },
    },
  })

  static relationMappings = {
    path: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: 'Path',
      join: {
        from: 'trainings.path_id',
        to: 'paths.id',
      },
    },
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
    courses: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: 'Course',
      join: {
        from: 'trainings.id',
        through: {
          from: 'trainings_courses.training_id',
          to: 'trainings_courses.course_id',
        },
        to: 'courses.id',
      },
    },
  }

  updatedAt() {
    return this.updated_at
  }

  link() {
    return trainingRoute(this.slug)
  }

  longTitle() {
    return `Formation ${this.title}`
  }

  socialPicture() {
    const cloudinaryId = this.social_icon || this.icon
    return `https:${clUrl(cloudinaryId, 'c_scale,w_1200')}`
  }

  socialTitle() {
    return this.social_title || this.longTitle()
  }

  socialAbstract() {
    return this.social_abstract || this.abstract
  }

  duration() {
    if (!this.courses) {
      throw new Error('"courses" must be loaded to get "duration".')
    }

    return this.courses.length / 2
  }

  coursePrice() {
    return 200
  }

  interPrice() {
    if (!this.courses) {
      throw new Error('"courses" must be loaded to get "intraPrice".')
    }

    return this.courses.length * this.coursePrice()
  }

  dayPrice() {
    return 500
  }

  intraPrice() {
    return this.duration() * this.dayPrice()
  }

  async siblings() {
    return Training.query()
      .whereNot({ id: this.id })
      .orderByRaw('random()')
      .limit(2)
  }
}
