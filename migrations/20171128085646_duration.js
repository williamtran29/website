exports.up = knex =>
  knex.schema.table('trainings', table => {
    table.integer('duration')
  })

exports.down = knex =>
  knex.schema.table('trainings', table => {
    table.dropColumn('duration')
  })
