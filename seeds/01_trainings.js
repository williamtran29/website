exports.seed = async knex => {
  await knex('trainings').truncate()
  await knex('trainings').insert([
    {
      name: 'JavaScript',
      duration: 3,
      abstract: 'Apprenez les bases du JavaScript',
      description: `## Plein de choses dans cette formation
Et même plus encore !

## Et encore d'autres choses
Et voilà...`,
      cloudinary_id: 'training-javascript',
      slug: 'formation-javascript',
    },
    {
      name: 'React',
      duration: 2,
      abstract: 'Tout connaître sur React',
      description: `## React rocks
On vous forme à React!`,
      cloudinary_id: 'training-react',
      slug: 'formation-react',
    },
  ])
}
