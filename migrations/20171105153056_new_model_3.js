exports.up = knex =>
  knex.schema
    .table('trainings', table => {
      table.dropColumn('path_id')
    })
    .dropTable('trainings_courses')
    .dropTable('courses')
    .dropTable('paths')

exports.down = () => {}
