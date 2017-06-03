exports.seed = async (knex) => {
  await knex('trainings').truncate()
  await knex('trainings').insert([
    {
      name: 'Formation JavaScript',
      duration: 3,
      abstract: 'Apprenez les bases du JavaScript',
      description: `## Plein de choses dans cette formation
Et même plus encore !

## Et encore d'autres choses
Et voilà...`,
      cloudinary_id: 'js',
    },
    {
      name: 'Formation React',
      duration: 2,
      abstract: 'Tout connaître sur React',
      description: `## React rocks
On vous forme à React!`,
      cloudinary_id: 'react',
    },
  ])
}
