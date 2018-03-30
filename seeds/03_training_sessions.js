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
    sessions: [['2019-01-08', '2019-01-11'], ['2019-01-05', '2019-01-08']],
  })

  await createSessions({
    trainingSlug: 'react-fondamental',
    locationName: 'Smooth Code',
    sessions: [
      ['2018-11-20', '2018-11-21'],
      ['2018-12-11', '2018-12-12'],
      ['2019-01-22', '2019-01-23'],
      ['2019-02-19', '2019-02-20'],
      ['2019-03-19', '2019-03-20'],
    ],
  })

  await createSessions({
    trainingSlug: 'react-avance',
    locationName: 'Smooth Code',
    sessions: [
      ['2018-11-22', '2018-11-23'],
      ['2018-12-13', '2018-12-14'],
      ['2019-01-24', '2019-01-25'],
      ['2019-02-21', '2019-02-22'],
      ['2019-03-21', '2019-03-22'],
    ],
  })

  await createSessions({
    trainingSlug: 'graphql-intense',
    locationName: 'Smooth Code',
    sessions: [['2019-02-05', '2019-02-06']],
  })
}
