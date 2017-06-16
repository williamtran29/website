exports.up = knex =>
  knex.schema.table('trainings', table => {
    table.string('color').notNullable()
    table.text('outline').notNullable()
    table.integer('price').notNullable()
  })

exports.down = knex =>
  knex.schema.table('trainings', table => {
    table.dropColumn('color')
    table.dropColumn('outline')
    table.dropColumn('price')
  })
