exports.seed = async knex => {
  await knex('trainings').insert([
    {
      title: 'Javascript Moderne',
      color: '#FFC600',
      abstract: `Découvrez comment créer un projet JavaScript moderne complet. Les bonnes pratiques, les nouveautés, les outils, le JavaScript d'aujourd'hui et de demain n'aura plus aucun secret pour vous !`,
      description: '-',
      icon: 'ES2017_Starter_ehl6lk',
      slug: 'javascript-moderne',
      rank: 0,
      objectives: `Le langage JavaScript est aujourd'hui incontournable. Que ce soit dans les applications mobiles, les sites internet ou même les robots, vous le croiserez partout !

Le but de de ce Workshop est de maîtriser le coeur du langage et son écosystème à travers la construction d'une application de A à Z. Il vous ouvrira les portes du développement front moderne avec React mais également celles du développement back avec Node.js.`,
      prerequisites: `- Les développeurs JavaScript ES5 souhaitant se mettre à jour et passer à la nouvelle version.
- Les développeurs utilisant déjà ES6 souhaitant approfondir leurs connaissances et leurs bonnes pratiques.
- Les développeurs souhaitant changer de langage et se mettre au JavaScript.
- Les graphistes souhaitant passer à l'étape supérieure et acquérir les bases du JavaScript.
- Les directeurs techniques ou chefs de projets souhaitant se mettre à niveau sur les nouvelles bonnes pratiques.`,
      social_title: 'Formation JavaScript Moderne',
      social_abstract:
        'Apprenez à développer un projet JavaScript moderne (ES2017) et augmentez votre productivité.',
      live: true,
      price: 1600,
      courses: JSON.stringify([
        {
          title: 'Les bases de JavaScript (ES5)',
          content:
            "Malgré que ES5 soit sorti en 2009, il n'est toujours pas exploité à 100%. Pour bien comprendre les nouveautés apparues dans JavaScript ces dernières années, il faut maîtriser des notions clefs. Nous explorerons ces notions, souvent méconnues des développeurs.\n\n- Comprendre la différence entre scope et hoisting\n- Utiliser le map et reduce sur les tableaux\n- Comprendre les différences entre un prototype et une fonction\n- Modifier le comportement d'un objet grâce au descripteur de propriété\n\n",
        },
        {
          title: 'Outillage',
          content:
            "Pour bien démarrer un projet, il faut utiliser les bons outils. Certains sont incontournables, d'autres font gagner un temps précieux ! Nous explorerons ensemble la jungle du JavaScript moderne.\n\n- Développer plus vite avec Prettier\n- Détecter les erreurs au plus tôt avec ESLint\n- Utiliser le JavaScript de demain dès aujourd'hui avec Babel\n- Ne plus se soucier du build avec Webpack\n\n",
        },
        {
          title: 'Nouvelles syntaxes',
          content:
            "Le JavaScript d'aujourd'hui n'a pas grand chose à voir avec celui d'il y a quelques années. Parfois on se demande même s'il s'agit du même langage. Ces nouveautés rendent le code plus simple et plus efficace.\n\n- Oublier les concaténations avec les templates strings\n- Qu'est-ce qu'un symbole ? Quels sont les cas d'utilisation ?\n- Destructurer votre code de façon élégante et efficace\n- Prendre de l'avance et utiliser des fonctionnalités ES2018 dès aujourd'hui !\n\n",
        },
        {
          title: 'Classes, modules et fonctions',
          content:
            "Structurer son code est essentiel, JavaScript nous propose de nombreuses solutions : les modules, les classes ou les fonctions. Mais avoir à disposition ces structures ne résout pas tout, nous découvrirons comment les utiliser de manière simple et efficace.\n\n- Organiser votre code de façon efficace avec les modules ES2015\n- Quand utiliser une arrow function ? Quels sont les avantages ?\n- Qu'apportent les classes par rapport aux prototypes ?\n\n",
        },
        {
          title: 'Asynchronisme',
          content:
            "JavaScript est basé sur une boucle événementielle, l'asynchrone est au coeur du langage. Nous verrons ensemble les évolutions apportées au langage qui permettent d'écrire à la fois un code clair et performant.\n\n- Comment fonctionne la boucle événementielle ?\n- Qu'est-ce qu'une promesse ? Comment passer d'un callback à une promesse ?\n- Ecrire du code lisible avec async / await\n\n",
        },
        {
          title: 'Nouvelles structures',
          content:
            "ES2016 a renforcé les structures existantes comme les tableaux et en a apporté des nouvelles : les Maps et les Sets. Maîtriser ces structures est essentiel et permet d'acquérir une expertise du langage hors du commun.\n\n- Exploiter la puissance des itérateurs et des générateurs\n- Découvrir les nouvelles structures : Map, WeakMap, Set et WeakSet\n- Explorer la méta-programmation avec les Proxies\n",
        },
      ]),
    },
    {
      title: 'React Fondamental',
      color: '#00b6d6',
      abstract: `Apprendre React en une journée. Au delà de l'API, ce Workshop vous permettra de comprendre la philosophie et les bonnes pratiques de React afin d'être productif immédiatement.`,
      description: '-',
      icon: 'React_xkzvtu',
      slug: 'react-fondamental',
      rank: 0,
      objectives: `Ce Workshop vous permettra de comprendre la philosophie et de maîtriser les bases de React. A travers la création d'une application tout au long de la journée, nous explorerons ensemble l'approche composant et déclarative de React. Vous serez en mesure d'utiliser React dans votre application dès le lendemain.`,
      prerequisites: `- Les développeurs souhaitant éviter de passer une semaine à lire de la documentation pas très intéressante.
- Les développeurs souhaitant apprendre React rapidement.
- Les étudiants sortis d'école souhaitant acquérir une expérience React pour leur premier job.
- Les développeurs jQuery ou Backbone souhaitant passer à une approche "composant".
- Les développeurs Angular ou Vue curieux de savoir les avantages de React.
- Les graphistes souhaitant passer à la vitesse supérieure et créer eux-même leurs composants.
- Les directeurs techniques ou chefs de projets souhaitant se mettre à niveau sur les nouvelles bonnes pratiques.`,
      social_title: 'Formation React Fondamental',
      social_abstract: `Apprenez à développer une application React en une journée.`,
      live: true,
      price: 400,
      courses: JSON.stringify([
        {
          title: 'Mise à niveau ES2017',
          content:
            "React est un framework d'application moderne, il tire parti des dernières fonctionalités du langage JavaScript. Afin de bien comprendre et maîtriser React, nous reverrons ensemble les nouveautés du langage JavaScript.\n\n- Comprendre la syntaxe : déstructuration, arrow functions, classes et template strings\n- Gérer l'asynchrone de manière moderne avec async / await et les Promises\n- Découper son code de manière efficace avec les modules ES2015\n\n",
        },
        {
          title: 'Pourquoi React ?',
          content:
            "On parle souvent de React sans savoir vraiment ce qu'il apporte et quels sont ses réels avantages. Qu'est-ce qu'un code \"déclaratif\" ? Quelles différences avec un code \"impératif\" ? Nous répondrons ensemble à ces questions afin de comprendre comment React permet d'augmenter sa productivité.\n\n- Comprendre les problèmes résolus par React\n- Découvrir les points forts de React par rapport aux autres frameworks\n- Comprendre l'approche déclarative de React\n\n",
        },
        {
          title: 'Outillage',
          content:
            "Adopter React c'est également adopter tout un écosystème. Il est parfois difficile de s'y retrouver parmi tous les outils mis à disposition. Nous verrons ensemble les outils clefs qui vous permettront de coder de façon rapide, agréable et efficace.\n\n- Comprendre l'écosystème React\n- Utiliser les bons outils pour développer plus vite\n- Prettier, Babel, Webpack, ESLint...\n\n",
        },
        {
          title: 'Composants',
          content:
            'Les composants sont au coeur de React. Nous apprendrons comment les créer, leur ajouter un state, tirer parti de leur cycle de vie et les documenter.\n\n- Définir des composants\n- Ajouter un state à un composant\n- Documenter ses composants avec les propTypes\n- Intéragir avec les événements\n\n',
        },
        {
          title: 'State vs Props',
          content:
            "Comprendre la différence entre le state et les props est fondamental. Nous explorerons ensemble ces différences et découvrirons comment passer de l'un à l'autre.\n\n- Comprendre la différence entre state et props\n- Savoir quand utiliser le state vs props\n- Composer des composants génériques en composant spécialisés\n- Faire transiter de la donnée dans son application\n\n",
        },
        {
          title: 'Formulaires',
          content:
            'Les formulaires sont souvent au coeur de toute application. React et son approche "déclarative" vous ferons aimer à nouveau les formulaires.\n\n- Apprendre à créer des formulaires\n- Composants contrôlés VS non contrôlés\n',
        },
      ]),
    },
    {
      title: 'React Avancé',
      color: '#3c56a5',
      abstract: `Apprenez à créer des composants réutilisables et à rendre votre application React performante et scalable en maîtrisant les techniques les plus avancées.`,
      description: '-',
      icon: 'React_xkzvtu',
      slug: 'react-avance',
      rank: 0,
      objectives: `Ce Workshop vous permettra d'approfondir vos connaissances en React. Vous découvrirez au travers de la création d'une application comment scaler, tester, optimiser et tirer parti à 100% de React. Vous serez en mesure d'architecturer des applications complexes autour de React et Redux.`,
      prerequisites: `- Les développeurs ayant suivi la formation React fondamental et souhaitant aller plus loin.
- Les développeurs utilisant déjà React et souhaitant découvrir les bonnes pratiques pour partir sur de bonnes bases.
- Les architectes ou lead développeurs responsable de la mise en place et de scalabilité de l'architecture React au sein de leur équipe.`,
      social_title: 'Formation React Avancé',
      social_abstract: `Apprenez à rendre votre application React modulaire, performante et testable.`,
      live: true,
      price: 800,
      courses: JSON.stringify([
        {
          title: 'Tester et déboguer',
          content:
            "Il est essentiel de tester son application pour éviter les régressions. Nous verrons ensemble comment tester ses composants avec plusieurs approches : unitaires, intégration et snapshots.\n\n- Utiliser l'extension React\n- Tester ses composants avec Jest et Enzyme\n- Utiliser le snapshot testing\n\n",
        },
        {
          title: 'Optimisation des performances de rendu',
          content:
            'Au fil du temps, votre application React grossit et des problèmes de performances peuvent apparaître. Nous découvrirons comment investiguer et résoudre ces problèmes de performances.\n\n- Identifier un problème de performance\n- Optimiser son application avec la notion de "pureté"\n\n',
        },
        {
          title: 'Render props',
          content:
            'Render props est un pattern React vous permettant de garder une approche déclarative. Nous découvrirons comment utiliser ce pattern et rendre votre application plus simple et plus composable.\n\n- Utiliser le render props\n- Savoir quand utiliser le render props\n\n',
        },
        {
          title: 'Higher Order Components',
          content:
            "Les Higher Order Components permettent d'avoir une approche fonctionnelle et de composer vos composants. Nous verrons ensemble comment partager de la logique et tirer parti de ce puissant pattern.\n\n- Créer un Higher Order Component\n- Savoir quand utiliser un Higher Order Component\n\n",
        },
        {
          title: 'React Router',
          content:
            "React Router est un élément essentiel dans une application, c'est également un bon exemple car il utilise de nombreux patterns très utiles. Nous explorerons ensemble comment le mettre en place et les différents patterns utilisés par React Router.\n\n- Mettre en place React Router\n- Explorer les patterns utilisés par la librairie (higher order components, render props...)\n\n",
        },
        {
          title: 'CSS in JS',
          content:
            "Le CSS est souvent mis de côté et présente aujourd'hui de nombreux problèmes à l'ère des composants. C'est pourquoi le CSS in JS est apparu, nous verrons ensemble ce qu'il permet de résoudre et ses avantages.\n\n- Comprendre les problèmes résolus par le CSS in JS\n- Mettre en place styled-components\n\n",
        },
        {
          title: 'Redux',
          content:
            "React est souvent associé à Redux. Redux présente beaucoup d'avantages en particulier pour faire scaler votre application. Ensemble, nous découvrirons comment le mettre en place et surtout architecturer son application autour de Redux.\n\n- Comprendre la philosophie et les problèmes résolus par Redux\n- Architecturer son application autour de Redux\n- State local VS Store Redux\n\n",
        },
        {
          title: 'Server side rendering',
          content:
            'React permet de créer des applications dîtes "isomorphique", autrement dit rendre son application côté serveur. Nous verrons les avantages de cette technique avancée et comment la mettre en place de façon efficace.\n\n- Client side rendering VS Server side rendering\n- Mettre en place du server-side rendering\n- Découvrir Next.js\n',
        },
      ]),
    },
    {
      title: 'GraphQL Intense',
      color: '#E10098',
      abstract: `Découvrez les avantages d'une API GraphQL VS REST. Apprenez à créer et consommer une API GraphQL mais surtout à la faire scaler de façon simple et efficace.`,
      description: '-',
      icon: 'GraphQL_x4ahiv',
      slug: 'graphql-intense',
      rank: 0,
      objectives: `Ce Workshop vous permettra de comprendre les avantages d'une API GraphQL face à une API REST traditionnelle. A travers la création d'une application client et serveur vous découvrirez toutes les fonctionnalités offertes par GraphQL. A la fin du Workshop, vous serez en mesure de le mettre en place dans vos projets.`,
      prerequisites: `- Les développeurs souhaitant créer une API partagée entre des applications web et mobile.
- Les développeurs React souhaitant avoir une approche moderne pour la partie fetching des données.
- Les architectes souhaitant élaborer une stratégie d'API au sein de leur organisation.`,
      social_title: 'Formation GraphQL Intense',
      social_abstract: `Apprenez à créer des API simples et puissantes avec GraphQL.
`,
      live: true,
      price: 800,
      courses: JSON.stringify([
        {
          title: 'Pourquoi GraphQL ?',
          content:
            'GraphQL est une technologie récente permettant de créer des API robustes et scalables. Nous verrons ensemble les avantages apportés par GraphQL en comparaison avec les API REST classiques.\n\n- Comprendre les différences entre REST et GraphQL\n- Apprendre à penser son API sous forme de graphe\n\n',
        },
        {
          title: "Création d'un serveur et d'un schema",
          content:
            "Utiliser GraphQL c'est tout d'abord créer un serveur et un schema GraphQL. Nous créerons ensemble un serveur Express exposant un schema GraphQL.\n\n- Acquérir les bases de Node.js et Express\n- Créer un schema GraphQL\n- Découvrir comment architecturer une API GraphQL\n\n",
        },
        {
          title: 'Tester et explorer son API',
          content:
            "GraphQL fournit des outils puissants permettant de tester et d'explorer son API GraphQL. Il est important de maîtriser ces outils pour tirer partie de la puissance de GraphQL.\n\n- Utiliser Jest pour tester son API GraphQL\n- Explorer son API avec GraphiQL\n\n",
        },
        {
          title: 'Apollo',
          content:
            "Apollo est le client de prédilection pour GraphQL, il permet de connecter votre API à une application web ou mobile. Nous verrons ensemble comment l'utiliser et tirer parti au maximum d'Apollo.\n\n- Requêter des données\n- Modifier des données avec les mutations\n- Ajouter une dimension temps réel avec les subscriptions\n- Gérer les sessions et la pagination\n\n",
        },
        {
          title: 'Optimisations',
          content:
            "Créer une API GraphQL est relativement simple, en revanche la faire scaler et l'optimiser c'est une autre affaire. Il existe plusieurs techniques permettant d'optimiser GraphQL à la fois côté serveur et côté client. Nous parcourerons ensemble ces techniques.\n\n- Ajouter du cache côté client et utiliser le query splitting\n- Eviter les requètes n+1\n- Scaler son application au sein d'une architecture micro-service\n",
        },
      ]),
    },
  ])
}
