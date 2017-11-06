exports.seed = async knex => {
  const companies = await knex('companies').insert(
    [
      {
        name: 'Le Monde',
        logo: 'lemonde_yfxqll',
        color: '#000',
      },
      {
        name: 'Matters',
        logo: 'Matters_hfnhdc',
        color: '#0B8693',
      },
      {
        name: '42 Consulting',
        logo: '42-cons_heplkt',
        color: '#9A9A9A',
      },
      {
        name: 'Doctolib',
        logo: 'doctolib_oop28m',
        color: '#1799E2',
      },
      {
        name: 'IFAP',
        logo: 'ifap_fswwte',
        color: '#5B8C33',
      },
    ],
    'id',
  )

  await knex('testimonials').insert([
    {
      rank: 10,
      company_id: companies[0],
      text: `Greg un excellent développeur full-stack : il maîtrise l'ensemble des technos web, depuis le front jusqu'au back mais également, et c'est plus rare, les contraintes liées à l'hébergement.`,
      name: 'Olivier Grange Labat',
      title: 'Directeur technique du Monde.fr',
      avatar: 'Lxz5ualb_400x400_vsqqnm',
      featured: true,
    },
    {
      rank: 20,
      company_id: companies[1],
      text: `Greg nous a permis de découvrir React en une journée !`,
      name: 'Boris Hocdé',
      title: 'Développeur PHP',
      avatar: 'boris_ev3cbg',
      featured: false,
    },
    {
      rank: 30,
      company_id: companies[2],
      text: `Une formation large, qui m'a permise de mettre le pied à l'étrier !`,
      name: 'Buron Cédric',
      title: 'Développeur',
      avatar: 'buron_rdvv6v',
      featured: false,
    },
    {
      rank: 40,
      company_id: companies[3],
      text: `Greg est un expert JavaScript, il a apporté beaucoup à Doctolib.`,
      name: 'Jessy Bernal',
      title: 'CTO & co-fondateur',
      avatar: 'jessy_bernal',
      featured: true,
    },
    {
      rank: 50,
      company_id: companies[4],
      text: `Une intervention efficace grâce à un formateur compétent.`,
      name: 'Stéphane Haute-Pottier',
      title: 'Chef de projet numérique',
      featured: false,
    },
  ])
}
