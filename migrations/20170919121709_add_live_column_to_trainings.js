exports.up = knex =>
  knex.schema.table('trainings', table => {
    table.boolean('live').defaultTo(false)
  })

exports.down = knex =>
  knex.schema.table('trainings', table => {
    table.dropColumn('live')
  })
