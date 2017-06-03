exports.up = knex =>
  knex.schema.createTable('trainings', (table) => {
    table.bigincrements('id').primary()
    table.timestamps(false, true)
    table.string('name').notNullable()
    table.integer('duration').notNullable()
    table.string('abstract').notNullable()
    table.text('description').notNullable()
    table.string('cloudinary_id').notNullable()
  })

exports.down = knex => knex.schema.dropTableIfExists('trainings')
