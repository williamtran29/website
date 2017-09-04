exports.seed = async knex => {
  await knex('paths').insert([
    {
      title: 'React',
      slug: 'react',
      color: '#00D8FF',
      icon: 'training-react',
      rank: 0,
    },
    {
      title: 'Node.js',
      slug: 'node-js',
      color: '#3D8B2E',
      icon: 'nodejs_jxent0',
      rank: 1,
    },
    {
      title: 'JavaScript',
      slug: 'javascript',
      color: '#FFC600',
      icon: 'training-javascript',
      rank: 2,
    },
    {
      title: 'RxJS',
      slug: 'rxjs',
      color: '#B7178C',
      icon: 'training-rxjs',
      rank: 3,
    },
    {
      title: 'GraphQL',
      slug: 'graphql',
      color: '#E10098',
      icon: 'training-graphql',
      rank: 4,
    },
  ])
}
