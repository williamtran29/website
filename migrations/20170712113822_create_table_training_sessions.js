exports.up = knex =>
  knex.schema
    .createTable('training_locations', table => {
      table.bigincrements('id').primary()
      table.timestamps(false, true)
      table.string('name').notNullable()
      table.string('address').notNullable()
      table.string('city').notNullable()
      table.string('zipcode').notNullable()
      table.string('country').notNullable()
    })
    .createTable('training_sessions', table => {
      table.bigincrements('id').primary()
      table.timestamps(false, true)
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.bigInteger('training_id').unsigned()
      table.foreign('training_id').references('trainings.id')
      table.bigInteger('training_location_id').unsigned()
      table.foreign('training_location_id').references('training_locations.id')
    })

exports.down = knex =>
  knex.schema
    .dropTableIfExists('training_sessions')
    .dropTableIfExists('training_locations')
