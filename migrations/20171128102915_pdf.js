exports.up = knex =>
  knex.schema.table('trainings', table => {
    table.string('pdf')
  })

exports.down = knex =>
  knex.schema.table('trainings', table => {
    table.dropColumn('pdf')
  })
