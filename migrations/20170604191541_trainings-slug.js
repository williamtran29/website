exports.up = knex =>
  knex.schema.table('trainings', table => {
    table.string('slug').notNullable()
    table.unique('slug')
  })

exports.down = knex =>
  knex.schema.table('trainings', table => {
    table.dropColumn('slug')
  })
