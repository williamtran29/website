exports.seed = async knex => {
  const paths = await knex('paths')
  const js = paths.find(({ title }) => title === 'JavaScript')
  const node = paths.find(({ title }) => title === 'Node.js')
  const react = paths.find(({ title }) => title === 'React')
  const rx = paths.find(({ title }) => title === 'RxJS')
  const graphql = paths.find(({ title }) => title === 'GraphQL')

  await knex('trainings').insert([
    {
      title: 'ES2017 Starter',
      abstract: 'Passez de ES5 à ES2017 en un clin d’oeil !',
      description: '-',
      icon: 'ES2017_Starter_ehl6lk',
      slug: 'es2017-starter',
      path_id: js.id,
    },
    {
      title: 'ES2017 Complet',
      abstract:
        'Découvrez les nouveautés apportées par ES6 / ES2015, ES2016 et ES2017.',
      description: '-',
      icon: 'ES2017_Full_buu67y',
      slug: 'es2017',
      path_id: js.id,
    },
    {
      title: 'Node.js Starter',
      abstract: 'Devenez opérationnel sur Node.js en deux jours.',
      description: '-',
      icon: 'Node.js_Starter_wnfoll',
      slug: 'nodejs-starter',
      path_id: node.id,
    },
    {
      title: 'Node.js Complet',
      abstract: 'Apprenez à maîtriser Node.js de A à Z.',
      description: '-',
      icon: 'Node.js_Full_g6j9tm',
      slug: 'nodejs',
      path_id: node.id,
    },
    {
      title: 'React + Redux',
      abstract: 'Apprenez à maîtriser React + Redux.',
      description: '-',
      icon: 'React_Redux_vuoqdy',
      slug: 'react-redux',
      path_id: react.id,
    },
    {
      title: 'React',
      abstract:
        'Apprenez à créer des interfaces web modernes, fluides et interactives.',
      description: '-',
      icon: 'React_knbxrb',
      slug: 'react',
      path_id: react.id,
    },
    {
      title: 'Redux',
      abstract: 'Devenez un pro de Redux !',
      description: '-',
      icon: 'Redux_zipijf',
      slug: 'redux',
      path_id: react.id,
    },
    {
      title: 'RxJS',
      abstract: 'Maîtrisez la programmation réactive.',
      description: '-',
      icon: 'RxJS_lgelp6',
      slug: 'rxjs',
      path_id: rx.id,
    },
    {
      title: 'GraphQL',
      abstract: 'Créez des API modernes et évolutives avec GraphQL.',
      description: '-',
      icon: 'GraphQL_x4ahiv',
      slug: 'graphql',
      path_id: graphql.id,
    },
  ])

  await knex('courses').insert([
    {
      title: 'Les bases de JavaScript',
      outline: `- Histoire et philosophie de JavaScript
	- Caractéristiques du langage
	- Node.js et les cas d’utilisation

- Variables et primitives
	- Déclaration de variables
	- Primitives du langage

- Tableaux
	- Déclaration et accès aux valeurs
	- Fonctions de Array.prototype

- Fonctions
	- Déclaration et appel de fonctions
	- Caractéristiques spécifiques à JavaScript

- Objets
	- Déclaration et accès aux propriétés`,
      path_id: js.id,
    },
    {
      title: 'JavaScript ES5 avancé',
      outline: `- Fonctions
	- Scope et closure
	- Notion de binding (this, call et apply)

- Objets
	- Descripteurs de propriétés
	- Itération sur les propriétés

- Prototypes et héritage
	- Utilisation des prototypes
	- Implémenter l’héritage avec les prototypes`,
      path_id: js.id,
    },
    {
      title: 'Démarrer un projet ES2017',
      outline: `- ES2017 c’est quoi ?
	- Processus d’evolution du langage et TC39
	- Support des navigateurs

- Transpiler avec Babel
	- Qu’est ce qu’un transpiler ?
	- Installation et configuration de Babel

- Linter son code avec ESLint
	- Qu’est ce qu’un linter ?
	- Installation et configuration de ESLint

- Formater son code avec Prettier
	- Installation et configuration de Prettier
	- Compatibilité avec ESLint`,
      path_id: js.id,
    },
    {
      title: 'ES2017 : Sucre syntaxique et destructuration',
      outline: `- Les nouvelles fonctions des objets natifs
	- Number et Math
	- String

- Variables et scope
	- let et const
	- Scope des variables, classes et fonctions

- Template strings
	- Interpolation et multiligne
	- Tagged template strings

- Symbols
	- Qu'est-ce qu'un symbole ?
	- Cas d’utilisation

- Destructuration
	- Destructurer les objets, les tableaux et les arguments
	- Renommer les variables
	- Assigner des valeurs par défaut
	- Assigner une propriété via destructuration
	- Opérateurs spread et rest

- Objects
	- Raccourcis de fonctions et de propriétés
	- Propriétés dynamiques
	- Nouvelles méthodes et Object.assign`,
      path_id: js.id,
    },
  ])

  const jsTraining = await knex('trainings')
    .where({ slug: 'es2017-starter' })
    .first()
  const courses = await knex('courses')

  await knex('trainings_courses').insert(
    courses.map(({ id: course_id }, index) => ({
      rank: index,
      course_id,
      training_id: jsTraining.id,
    })),
  )
}
