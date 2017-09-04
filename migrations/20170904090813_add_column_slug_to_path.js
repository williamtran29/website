exports.up = knex =>
  knex.schema.table('paths', table => {
    table.string('slug')
    table.unique('slug')
  })

exports.down = knex =>
  knex.schema.table('paths', table => {
    table.dropColumn('slug')
  })
