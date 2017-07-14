exports.seed = async knex => {
  await knex('training_sessions').insert([
    {
      id: 1,
      start_date: '2017-07-26',
      end_date: '2017-07-26',
      training_id: 7,
      training_location_id: 1,
    },
    {
      id: 2,
      start_date: '2017-12-07',
      end_date: '2017-12-10',
      training_id: 7,
      training_location_id: 1,
    },
  ])
}
