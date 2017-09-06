exports.up = knex =>
  knex.schema.table('training_sessions', table => {
    table.integer('participants').notNullable().defaultTo(0)
  })

exports.down = knex =>
  knex.schema.table('training_sessions', table => {
    table.dropColumn('participants')
  })
