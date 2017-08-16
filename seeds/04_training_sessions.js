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
    trainingSlug: 'javascript-es2017-focus',
    locationName: 'Smooth Code',
    sessions: [
      ['2017-10-03', '2017-10-04'],
      ['2017-11-08', '2017-11-09'],
      ['2017-12-06', '2017-11-07'],
    ],
  })

  await createSessions({
    trainingSlug: 'javascript-es2017',
    locationName: 'Smooth Code',
    sessions: [
      ['2017-10-02', '2017-10-05'],
      ['2017-11-07', '2017-11-10'],
      ['2017-12-05', '2017-12-08'],
    ],
  })

  await createSessions({
    trainingSlug: 'nodejs-focus',
    locationName: 'Smooth Code',
    sessions: [
      ['2017-09-19', '2017-09-20'],
      ['2017-10-30', '2017-10-31'],
      ['2017-11-27', '2017-11-18'],
    ],
  })

  await createSessions({
    trainingSlug: 'nodejs',
    locationName: 'Smooth Code',
    sessions: [
      ['2017-09-19', '2017-09-22'],
      ['2017-10-30', '2017-11-03'],
      ['2017-11-27', '2017-11-30'],
    ],
  })

  await createSessions({
    trainingSlug: 'react-redux',
    locationName: 'Smooth Code',
    sessions: [
      ['2017-09-11', '2017-09-14'],
      ['2017-10-24', '2017-10-27'],
      ['2017-11-20', '2017-11-23'],
    ],
  })

  await createSessions({
    trainingSlug: 'react',
    locationName: 'Smooth Code',
    sessions: [
      ['2017-09-11', '2017-09-13'],
      ['2017-10-24', '2017-10-26'],
      ['2017-11-20', '2017-11-22'],
    ],
  })

  await createSessions({
    trainingSlug: 'redux',
    locationName: 'Smooth Code',
    sessions: [
      ['2017-09-14', '2017-09-14'],
      ['2017-10-27', '2017-10-27'],
      ['2017-11-23', '2017-11-23'],
    ],
  })

  await createSessions({
    trainingSlug: 'rxjs',
    locationName: 'Smooth Code',
    sessions: [
      ['2017-09-25', '2017-09-26'],
      ['2017-11-16', '2017-11-17'],
      ['2017-12-14', '2017-12-15'],
    ],
  })

  await createSessions({
    trainingSlug: 'graphql',
    locationName: 'Smooth Code',
    sessions: [
      ['2017-09-25', '2017-09-26'],
      ['2017-11-16', '2017-11-17'],
      ['2017-12-14', '2017-12-15'],
    ],
  })
}
