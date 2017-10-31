exports.up = knex =>
  knex.schema.table('trainings', table => {
    table.text('outline')
    table.string('color')
    table.integer('price')
  })

exports.down = knex =>
  knex.schema.table('trainings', table => {
    table.dropColumn('outline')
    table.dropColumn('color')
    table.dropColumn('price')
  })
