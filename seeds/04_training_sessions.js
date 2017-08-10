exports.seed = async knex => {
  const jsTraining = await knex('trainings')
    .where({ slug: 'es2017-starter' })
    .first()
  const smoothCodeLocation = await knex('training_locations')
    .where({ name: 'Smooth Code' })
    .first()

  await knex('training_sessions').insert([
    {
      start_date: '2017-07-26',
      end_date: '2017-07-26',
      training_id: jsTraining.id,
      training_location_id: smoothCodeLocation.id,
    },
    {
      start_date: '2017-12-07',
      end_date: '2017-12-10',
      training_id: jsTraining.id,
      training_location_id: smoothCodeLocation.id,
    },
  ])
}
