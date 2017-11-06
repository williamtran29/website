exports.up = knex =>
  knex.schema.table('trainings', table => {
    table.dropColumn('outline')
    table.jsonb('courses')
  })

exports.down = knex =>
  knex.schema.table('trainings', table => {
    table.text('outline')
    table.dropColumn('courses')
  })
