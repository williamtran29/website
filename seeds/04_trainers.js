exports.seed = async knex => {
  await knex('trainers').insert([
    {
      first_name: 'Greg',
      last_name: 'Bergé',
      slug: 'greg-berge',
      description: `Développeur JavaScript depuis maintenant plus de 15 ans. Greg est à la fois co-fondateur, président et formateur principal de Smooth Code. Il est auteur de plusieurs librairies open-source à succès comme Shipit, React Hot Loader ou SVGR.`,
      picture: 'profile_greg_ihxwjo',
    },
    {
      first_name: 'Jérémy',
      last_name: 'Sfez',
      slug: 'jeremy-sfez',
      description: `Développeur et passionné de technologie, Jeremy est à la fois co-fondateur, directeur général et directeur commercial de Smooth Code. Il a su faire ses preuves chez BNP Paribas, Canal + et a fait partie de l’équipe fondatrice de Doctolib.`,
      picture: 'j5ffbdzxu58cfpfl4b84',
    },
  ])

  async function setTrainerTrainings(trainerSlug, trainings) {
    const trainer = await knex('trainers')
      .where({ slug: trainerSlug })
      .first()
    if (!trainer) throw new Error(`Trainer ${trainerSlug} not found`)
    await knex('trainings_trainers').insert(
      /* eslint-disable camelcase */
      trainings.map(({ id: training_id }) => ({
        training_id,
        trainer_id: trainer.id,
      })),
      /* eslint-enable camelcase */
    )
  }

  await setTrainerTrainings('greg-berge', await knex('trainings'))
}
