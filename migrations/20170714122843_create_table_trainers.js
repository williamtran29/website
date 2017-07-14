exports.up = knex =>
  knex.schema
    .createTable('trainers', table => {
      table.bigincrements('id').primary()
      table.timestamps(false, true)
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('cloudinary_id').notNullable()
      table.text('description').notNullable()
      table.string('slug').notNullable()
      table.unique('slug')
    })
    .createTable('trainings_trainers', table => {
      table.bigincrements('id').primary()
      table.timestamps(false, true)
      table.bigInteger('training_id').unsigned().index()
      table.foreign('training_id').references('trainings.id')
      table.bigInteger('trainer_id').unsigned().index()
      table.foreign('trainer_id').references('trainers.id')
    })
    .table('training_sessions', table => {
      table.index('training_id')
      table.index('training_location_id')
      table.index('start_date')
      table.index('end_date')
    })

exports.down = knex =>
  knex.schema
    .dropTableIfExists('trainings_trainers')
    .dropTableIfExists('trainers')
    .table('training_sessions', table => {
      table.dropIndex('training_id')
      table.dropIndex('training_location_id')
    })
