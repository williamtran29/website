exports.seed = async knex => {
  await knex('trainings').truncate()
  await knex('trainings').insert([
    {
      name: 'JavaScript',
      abstract: 'Apprenez les bases du JavaScript',
      color: '#313131',
      duration: 3,
      price: 1500,
      description: `## Plein de choses dans cette formation
Et même plus encore !

## Et encore d'autres choses
Et voilà...`,
      outline: `## Step One
## Step Two`,
      cloudinary_id: 'training-javascript',
      slug: 'formation-javascript',
    },
    {
      name: 'React',
      abstract: 'Tout connaître sur React',
      color: '#1a434a',
      duration: 2,
      price: 1500,
      description: `## React rocks
On vous forme à React!`,
      outline: `## Step One
## Step Two`,
      cloudinary_id: 'training-react',
      slug: 'formation-react',
    },
  ])
}
