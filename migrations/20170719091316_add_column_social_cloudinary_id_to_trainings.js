exports.up = knex =>
  knex.schema.table('trainings', table => {
    table.string('og_cloudinary_id')
  })

exports.down = knex =>
  knex.schema.table('trainings', table => {
    table.dropColumn('og_cloudinary_id')
  })
