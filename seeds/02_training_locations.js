exports.seed = async knex => {
  await knex('training_locations').insert([
    {
      id: 1,
      name: 'Smooth Code',
      address: '41 rue Réaumur',
      city: 'Paris',
      zipcode: '75003',
      country: 'France',
    },
  ])
}
