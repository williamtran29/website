exports.seed = async knex => {
  const reactTraining = await knex('trainings')
    .where({ slug: 'formation-react' })
    .first()
  const parisLocation = await knex('training_locations').first()

  await knex('training_sessions').insert([
    {
      start_date: '2017-07-26',
      end_date: '2017-07-26',
      training_id: reactTraining.id,
      training_location_id: parisLocation.id,
    },
    {
      start_date: '2017-12-07',
      end_date: '2017-12-10',
      training_id: reactTraining.id,
      training_location_id: parisLocation.id,
    },
  ])
}
