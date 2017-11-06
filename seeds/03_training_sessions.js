exports.seed = async knex => {
  async function createSessions({ trainingSlug, locationName, sessions }) {
    const training = await knex('trainings')
      .where({ slug: trainingSlug })
      .first()

    const location = await knex('training_locations')
      .where({ name: locationName })
      .first()

    await knex('training_sessions').insert(
      sessions.map(([startDate, endDate]) => ({
        start_date: startDate,
        end_date: endDate,
        training_id: training.id,
        training_location_id: location.id,
      })),
    )
  }

  await createSessions({
    trainingSlug: 'javascript-moderne',
    locationName: 'Smooth Code',
    sessions: [['2018-01-08', '2018-01-11'], ['2018-03-05', '2018-03-08']],
  })

  await createSessions({
    trainingSlug: 'react-fondamental',
    locationName: 'Smooth Code',
    sessions: [
      ['2017-11-20', '2017-11-21'],
      ['2017-12-11', '2017-12-12'],
      ['2018-01-22', '2018-01-23'],
      ['2018-02-19', '2018-02-20'],
      ['2018-03-19', '2018-03-20'],
    ],
  })

  await createSessions({
    trainingSlug: 'react-avance',
    locationName: 'Smooth Code',
    sessions: [
      ['2017-11-22', '2017-11-23'],
      ['2017-12-13', '2017-12-14'],
      ['2018-01-24', '2018-01-25'],
      ['2018-02-21', '2018-02-22'],
      ['2018-03-21', '2018-03-22'],
    ],
  })

  await createSessions({
    trainingSlug: 'graphql-intense',
    locationName: 'Smooth Code',
    sessions: [['2018-02-05', '2018-02-06']],
  })
}
