exports.up = knex =>
  knex.schema
    .createTable('paths', table => {
      table.bigincrements('id').primary()
      table.timestamps(false, true)
      table.integer('rank').defaultTo(0)
      table.string('title').notNullable()
      table.string('color').notNullable()
      table.string('icon').notNullable()

      table.index('rank')
    })
    .table('trainings', table => {
      table.dropColumns('duration', 'color', 'outline', 'price')
      table.renameColumn('name', 'title')
      table.renameColumn('cloudinary_id', 'icon')
      table.renameColumn('og_cloudinary_id', 'social_icon')
      table.integer('rank').defaultTo(0)
      table.text('objectives')
      table.text('prerequisites')
      table.string('social_title')
      table.string('social_abstract')
      table.bigInteger('path_id').unsigned()
      table.foreign('path_id').references('paths.id')

      table.index('rank')
      table.index('path_id')
    })
    .createTable('courses', table => {
      table.bigincrements('id').primary()
      table.timestamps(false, true)
      table.string('title').notNullable()
      table.text('outline')
      table.bigInteger('path_id').unsigned().notNullable()
      table.foreign('path_id').references('paths.id')

      table.index('path_id')
    })
    .createTable('trainings_courses', table => {
      table.bigincrements('id').primary()
      table.timestamps(false, true)
      table.integer('rank').defaultTo(0)
      table.bigInteger('training_id').unsigned().notNullable()
      table.foreign('training_id').references('trainings.id')
      table.bigInteger('course_id').unsigned().notNullable()
      table.foreign('course_id').references('courses.id')

      table.index('rank')
      table.index('training_id')
      table.index('course_id')
    })
    .table('training_sessions', table => {
      table.bigInteger('training_id').unsigned().notNullable().alter()
      table.bigInteger('training_location_id').unsigned().notNullable().alter()
    })
    .table('trainings_trainers', table => {
      table.bigInteger('training_id').unsigned().notNullable().alter()
      table.bigInteger('trainer_id').unsigned().notNullable().alter()
    })
    .table('trainers', table => {
      table.renameColumn('cloudinary_id', 'picture')
    })

exports.down = async () => null
