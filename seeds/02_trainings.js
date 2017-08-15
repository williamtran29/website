exports.seed = async knex => {
  const paths = await knex('paths')
  const js = paths.find(({ title }) => title === 'JavaScript')
  const node = paths.find(({ title }) => title === 'Node.js')
  const react = paths.find(({ title }) => title === 'React')
  const rx = paths.find(({ title }) => title === 'RxJS')
  const graphql = paths.find(({ title }) => title === 'GraphQL')

  await knex('trainings').insert([
    {
      rank: 0,
      title: 'ES2017 Starter',
      abstract:
        'Passez de ES5 à ES2017 avec les classes, arrow functions, déstructuration et async/await.',
      description: `JavaScript est un langage en perpétuelle évolution, chaque année des nouveautés y sont apportées. La formation **JavaScript ES2017** se focalise sur les innovations apportées au langage par **ES2015 (ES6)**, **ES2016** et **ES2017**.

Nous présenterons la **déstructuration**, les **modules**, les **arrow functions**, les **classes** et les **générateurs**. Nous aborderons aussi la gestion de l’asynchrone de manière élégante avec les **promises** et **async / await**. Côté outillage nous parlerons de **Babel**, **Webpack** et **ESLint** pour vous permettre d'intégrer les nouvelles fonctionnalités dans vos projets.

Un projet sera réalisé en fil rouge. Vous pourrez ainsi mettre en pratique les nouveautés évoquées tout au long de la formation.`,
      objectives: `
- Tirer partie des nouveautés apportées par ES2015 (ES6), ES2016 et ES2017
- Être capable d’appliquer les nouveaux paradigmes en production
      `,
      prerequisites: `
- Connaissance de JavaScript ES5
`,
      icon: 'ES2017_Starter_ehl6lk',
      slug: 'es2017-starter',
      path_id: js.id,
    },
    {
      rank: 1,
      title: 'ES2017 Complet',
      abstract:
        'Plongez dans le coeur du langage JavaScript et toutes les nouveautés de ES5 à ES2017.',
      description: `JavaScript est un langage en perpétuelle évolution, chaque année des nouveautés y sont apportées. La formation **JavaScript ES2017** se focalise sur les innovations apportées au langage par **ES2015 (ES6)**, **ES2016** et **ES2017**.

  Nous présenterons la **déstructuration**, les **modules**, les **arrow functions**, les **classes** et les **générateurs**. Nous aborderons aussi la gestion de l’asynchrone de manière élégante avec les **promises** et **async / await**. Côté outillage nous parlerons de **Babel**, **Webpack** et **ESLint** pour vous permettre d'intégrer les nouvelles fonctionnalités dans vos projets.

  Un projet sera réalisé en fil rouge. Vous pourrez ainsi mettre en pratique les nouveautés évoquées tout au long de la formation.`,
      objectives: `
- Comprendre en détail le coeur du langage JavaScript
- Découvrir l'ensemble des nouveautés apportées par ES2015 (ES6), ES2016 et ES2017
- Être capable d’appliquer les nouveaux paradigmes en production
      `,
      prerequisites: `
- Notions de base en développement ou connaissance d'un autre langage de programmation
`,
      icon: 'ES2017_Full_buu67y',
      slug: 'es2017',
      path_id: js.id,
    },
    {
      rank: 0,
      title: 'Node.js Starter',
      abstract:
        'Créez une application web avec Node.js en suivant les bonnes pratiques.',
      description: `
En quelques années Node.js a complètement révolutionné le développement des applications web. Offrant des **performances optimales** et une **flexibilité sans égale**, Node.js a su s'imposer comme le choix de prédilection pour concevoir des applications web. **Basé sur le moteur V8 du navigateur Chrome**, il permet de **faire tourner le même code côté client et côté serveur**. Node.js tire également sa force de son **gestionnaire de paquet "npm"** qui comptabilise plus de **475 000 modules disponibles**.

Utilisé par tous [**les géants du web**](https://nodejs.org/en/foundation/case-studies/), Node.js est aujourd'hui incontournable. En plus de permettre la **création d'applications web réactives grâce à WebSocket**, Node.js permet d'utiliser les **nouveaux outils de développement en ligne de commande** comme Webpack, Babel ou ESLint.

Dans cette formation vous découvrirez comment écrire du code **JavaScript moderne (ES2017) avec [Babel](https://babeljs.io/)**, profiter de l'écosystème grâce à **[npm](https://www.npmjs.com) et ses modules**,  maîtriser **l'asynchrone avec \`async\` / \`await\`**,  créer un **serveur web avec [Express](https://expressjs.com/)**,  créer des **interfaces réactives avec [Socket.io](https://socket.io/)** et écrire du **code isomorphique (client et serveur)**, **se connecter à une base de données avec [knex](http://knexjs.org/)**, **tester son code avec [Jest](https://facebook.github.io/jest/)**.

Un projet complet sera réalisé en fil rouge durant toute la formation, cela vous permettra de mettre en pratique toutes les nouveautés qui vous seront présentées.
        `,
      objectives: `
  - Savoir installer et utiliser Node.js et npm
  - Comprendre le fonctionnement de Node.js
  - Savoir créer une application web avec Node.js
  - Apprendre à structurer son code de manière optimale
  - Être capable de tester son code Node.js
        `,
      prerequisites: `
  - Des bases en JavaScript
  - Notions de fonctionnement basiques du web (client, server, HTTP,  requêtes, etc...)
        `,
      icon: 'Node.js_Starter_wnfoll',
      slug: 'nodejs-starter',
      path_id: node.id,
    },
    {
      rank: 1,
      title: 'Node.js Complet',
      abstract:
        'Un tour d’horizon complet de Node.js : application web, tests, CLI, Streams...',
      description: `
En quelques années Node.js a complètement révolutionné le développement des applications web. Offrant des **performances optimales** et une **flexibilité sans égale**, Node.js a su s'imposer comme le choix de prédilection pour concevoir des applications web. **Basé sur le moteur V8 du navigateur Chrome**, il permet de **faire tourner le même code côté client et côté serveur**. Node.js tire également sa force de son **gestionnaire de paquet "npm"** qui comptabilise plus de **475 000 modules disponibles**.

Utilisé par tous [**les géants du web**](https://nodejs.org/en/foundation/case-studies/), Node.js est aujourd'hui incontournable. En plus de permettre la **création d'applications web réactives grâce à WebSocket**, Node.js permet d'utiliser les **nouveaux outils de développement en ligne de commande** comme Webpack, Babel ou ESLint.

Dans cette formation vous découvrirez comment écrire du code **JavaScript moderne (ES2017) avec [Babel](https://babeljs.io/)**, profiter de l'écosystème grâce à **[npm](https://www.npmjs.com) et ses modules**,  maîtriser **l'asynchrone avec \`async\` / \`await\`**,  créer un **serveur web avec [Express](https://expressjs.com/)**,  créer des **interfaces réactives avec [Socket.io](https://socket.io/)** et écrire du **code isomorphique (client et serveur)**, **se connecter à une base de données avec [knex](http://knexjs.org/)**, **tester son code avec [Jest](https://facebook.github.io/jest/)**.

Un projet complet sera réalisé en fil rouge durant toute la formation, cela vous permettra de mettre en pratique toutes les nouveautés qui vous seront présentées.
      `,
      objectives: `
- Savoir installer et utiliser Node.js et npm
- Comprendre le fonctionnement de Node.js
- Savoir créer une application web avec Node.js
- Apprendre à structurer son code de manière optimale
- Être capable de tester son code Node.js
      `,
      prerequisites: `
- Des bases en JavaScript
- Notions de fonctionnement basiques du web (client, server, HTTP,  requêtes, etc...)
      `,
      icon: 'Node.js_Full_g6j9tm',
      slug: 'nodejs',
      path_id: node.id,
    },
    {
      rank: 0,
      title: 'React',
      abstract:
        'Apprenez à créer des interfaces web modernes, fluides et interactives avec React.',
      description: `
React est un moteur de rendu développé par Facebook se démarquant de la concurrence grâce à son architecture innovante, efficace et performante. React a maintenant une place incontestable dans l'écosystème JavaScript.

Pendant cette formation, vous découvrirez l'univers React et comment l'utiliser de façon optimal dans vos projets. Nous aborderons tous les aspects de React : sa philosophie, les **composants**, les **applications isomorphiques**, mais aussi **comment bien architecturer son application**, l'**optimiser** et la **déboguer**. Nous vous accompagnerons dans l'installation d'un environnement complet pour le développement en React avec les outils : **Atom**, **Babel**, **Prettier** et **ESLint**.

Un projet complet sera réalisé en fil rouge durant toute la formation pour vous permettre de mettre en pratique chacune des nouveautés présentées.
      `,
      objectives: `
- Découvrir React et maîtriser ses particularités
- Construire votre première application React en respectant les bonnes pratiques
- Utiliser les outils de développement adaptés
- Installer, configurer et utiliser les bibliothèques nécessaires
- Savoir comment intégrer React dans vos projets dès demain
      `,
      prerequisites: `
- Bonne connaissance du langage JavaScript ES5
      `,
      icon: 'React_knbxrb',
      slug: 'react',
      path_id: react.id,
    },
    {
      rank: 1,
      title: 'Redux',
      abstract:
        'Apprenez à maîtriser l’état de votre application grâce à Redux, mais aussi à la tester et à la déboguer.',
      description: `
React est un moteur de rendu développé par Facebook se démarquant de la concurrence grâce à son architecture innovante, efficace et performante. React a maintenant une place incontestable dans l'écosystème JavaScript.

Pendant cette formation, vous découvrirez l'univers React et comment l'utiliser de façon optimal dans vos projets. Nous aborderons tous les aspects de React : sa philosophie, les **composants**, les **applications isomorphiques**, mais aussi **comment bien architecturer son application**, l'**optimiser** et la **déboguer**. Nous vous accompagnerons dans l'installation d'un environnement complet pour le développement en React avec les outils : **Atom**, **Babel**, **Prettier** et **ESLint**.

Un projet complet sera réalisé en fil rouge durant toute la formation pour vous permettre de mettre en pratique chacune des nouveautés présentées.
        `,
      objectives: `
- Découvrir React et maîtriser ses particularités
- Construire votre première application React en respectant les bonnes pratiques
- Utiliser les outils de développement adaptés
- Installer, configurer et utiliser les bibliothèques nécessaires
- Savoir comment intégrer React dans vos projets dès demain
        `,
      prerequisites: `
- Bonne connaissance du langage JavaScript ES5
        `,
      icon: 'Redux_zipijf',
      slug: 'redux',
      path_id: react.id,
    },
    {
      rank: 2,
      title: 'React + Redux',
      abstract:
        'Découvrez comment créer des applications fluides avec React et comment gérer l’état de votre application grâce à Redux.',
      description: `
React est un moteur de rendu développé par Facebook se démarquant de la concurrence grâce à son architecture innovante, efficace et performante. React a maintenant une place incontestable dans l'écosystème JavaScript.

Pendant cette formation, vous découvrirez l'univers React et comment l'utiliser de façon optimal dans vos projets. Nous aborderons tous les aspects de React : sa philosophie, les **composants**, les **applications isomorphiques**, mais aussi **comment bien architecturer son application**, l'**optimiser** et la **déboguer**. Nous vous accompagnerons dans l'installation d'un environnement complet pour le développement en React avec les outils : **Atom**, **Babel**, **Prettier** et **ESLint**.

Un projet complet sera réalisé en fil rouge durant toute la formation pour vous permettre de mettre en pratique chacune des nouveautés présentées.
          `,
      objectives: `
- Découvrir React et maîtriser ses particularités
- Construire votre première application React en respectant les bonnes pratiques
- Utiliser les outils de développement adaptés
- Installer, configurer et utiliser les bibliothèques nécessaires
- Savoir comment intégrer React dans vos projets dès demain
          `,
      prerequisites: `
- Bonne connaissance du langage JavaScript ES5
          `,
      icon: 'React_Redux_vuoqdy',
      slug: 'react-redux',
      path_id: react.id,
    },
    {
      rank: 0,
      title: 'RxJS',
      abstract:
        'Apprenez les bases de la programmation Réactive et découvrez la puissance de RxJS.',
      description: `
La programmation fonctionnelle est maintenant incontournable dans l'écosystème JavaScript. Mise en avant par Lodash, puis par React et Redux, elle ouvre de nouvelles portes dans le développement web. La programmation Réactive peut être considérée comme l'étape suivante à la programmation fonctionnelle. Popularisée par Angular, le type Observable (cœur de la programmation Réactive) est en cours de standardisation et fera bientôt partie du langage.

La programmation Réactive Fonctionnelle permet de modéliser du code asynchrone sous la forme d'une simple collection avec une dimension temporelle. Très puissante, elle peut-être cependant difficile à appréhender.

RxJS est la bibliothèque la plus complète et la plus populaire pour appliquer ce paradigme. Elle est notamment utilisée dans Angular, ce qui fait d'elle une librairie incontournable.

Dans cette formation vous comprendrez la différence d'approche **pull / push**, le pattern **Observable** et **Observer** et l'**API RxJS dans des cas d'utilisation réels**.

Plusieurs exercices concrets tout au long de la formation vous permettront de mettre en pratique les concepts vus lors de ces deux jours.
      `,
      objectives: `
- Comprendre le paradigme de programmation réactive
- Maitriser la librairie RxJS (Développement et Test)
- Savoir appliquer la programmation réactive sur des cas réels
      `,
      prerequisites: `
- Niveau intermédiaire en JavaScript
      `,
      icon: 'RxJS_lgelp6',
      slug: 'rxjs',
      path_id: rx.id,
    },
    {
      rank: 0,
      title: 'GraphQL',
      abstract:
        'Passez des API Rest traditionnelles à des API modernes et évolutives avec GraphQL.',
      description: `
GraphQL est une spécification de requêtes permettant de structurer les réponses à volonté. Elle donne lieu à une nouvelle manière de concevoir des API. En 2012, Facebook se sentait bridé par les limitations des API REST traditionnelles, et a donc conçu GraphQL, une API caractérisée par un seul point d'accès et une architecture sous forme de graphe.

Dans cette formation vous découvrirez **une présentation rapide de GraphQL**. S'ensuivra un comparatif entre **une API GraphQL et une API REST traditionnelle**. Vous explorerez l'ensemble de la spécification, les **Query**, les **Types**, les **Mutations**, les **Fragments** et apprendrez comment l'utiliser dans vos projets de manière concrète.

Un projet complet sera réalisé en fil rouge durant toute la formation, cela vous permettra de mettre en pratique chacune des nouveautés au fil de la formation.
      `,
      objectives: `
- Se familiariser avec GraphQL
- Imaginer et modéliser une API GraphQL
- Déployer et utiliser une API GraphQL dans un environnement JavaScript
      `,
      prerequisites: `
- Notions de fonctionnement basiques du web (client, serveur, HTTP,  requêtes, etc...)
- Des bases en Node.js
- Des bases en React
      `,
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
	- Notion de binding (\`this\`, \`call\` et \`apply\`)

- Objets
	- Descripteurs de propriétés
	- Itérer sur les propriétés

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
      title: 'ES2017 : Sucre syntaxique et déstructuration',
      outline: `- Les nouvelles fonctions des objets natifs
	- Number et Math
	- String

- Variables et scope
	- \`let\` et \`const\`
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
	- Assigner une propriété via déstructuration
	- Opérateurs spread et rest (\`...\`)

- Objects
	- Raccourcis de fonctions et de propriétés
	- Propriétés dynamiques
	- Nouvelles méthodes et \`Object.assign\``,
      path_id: js.id,
    },
    {
      title: 'ES2017 : Modules, arrow functions et classes',
      outline: `
- Modules ES2015
	- Imports / exports de modules
	- Support des modules

- Fonctions fléchées
	- Déclarer une arrow function
	- Binding automatique

- Classes
	- Différences entre classes et prototypes
	- Héritage
	- Créer des objets dérivés avec \`Symbol.species\`
	- Retrouver le constructeur avec \`new.target\`
        `,
      path_id: js.id,
    },
    {
      title: 'ES2017 : Asynchronisme',
      outline: `
- Problématiques de l’asynchrone
	- Historique de l'asynchronisme en JavaScript

- Les promesses
	- Le concept de promesse
	- Créer et consommer des promesses
	- Passer d’un callback à une promesse

- Async / Await
	- Gestion de l’asynchrone avec \`async\` / \`await\`
	- Gestion des erreurs
        `,
      path_id: js.id,
    },
    {
      title: 'ES2017 : Collections',
      outline: `
- Tableaux
	- Construire des tableaux avec \`Array.from()\` et \`Array.of()\`
	- Nouvelles méthodes d’itération
	- Fonctions de recherche et de remplissage

- Itérateur
	- Qu’est ce qu’un itérateur ?
	- Les objets itérables
	- Parcourir un objet itérable avec \`for...of\`
	- Implémenter un itérateur

- Générateur
	- Qu’est ce qu’un générateur ?
	- Itérateurs, observeurs et coroutines
	- Implémenter un générateur

- Maps and Sets
	- Map et Set
	- WeakMap et WeakSet

- Tableaux typés
	- Différences avec un tableau classique
	- Cas d’utilisation
        `,
      path_id: js.id,
    },
    {
      title: 'ES2017 : Proxies et mémoire partagée',
      outline: `
- Proxies
	- Introduction à la méta-programmation
	- Cas d’utilisation des proxies
	- Implémenter un proxy

- Mémoire partagée et opérations atomiques
	- Parallélisme et concurrence
	- Partager la mémoire avec les SharedArrayBuffer
	- Accès sécurisé aux données partagées
        `,
      path_id: js.id,
    },
  ])

  // Node.js
  await knex('courses').insert([
    {
      title: 'Rappel ES2015 à ES2017',
      outline: `
- Principales nouveautés
	- Déclarer des variables avec \`let\` et \`const\`
	- Utiliser des template strings
	- Nouvelle syntaxe de classe
	- Déstructuration et valeurs par défaut
	- Arrow functions

- Modules ES2015
	- Exporter et importer des modules
	- Découper son code de manière optimale

- Asynchronisme
	- Les callbacks façon Node.js
	- Les promesses
	- \`async\` / \`await\`
      `,
      path_id: node.id,
    },
    {
      title: 'Démarrer un projet Node.js',
      outline: `
- Premier pas avec Node.js
	- Installer et mettre à jour Node avec nvm
	- Créer son premier programme Node.js

- Les bases de npm
	- Qu’est-ce que npm ?
	- Gérer et sécuriser les dépendances de son projet
	- Anatomie de package.json

- Transpiler avec Babel
	- Qu’est ce qu’un transpiler ?
	- Installation et configuration de Babel

- Linter son code avec ESLint
	- Qu’est ce qu’un linter ?
	- Installation et configuration de ESLint

- Formater son code avec Prettier
	- Installation et configuration de Prettier
      `,
      path_id: node.id,
    },
    {
      title: 'Création d’une application web avec Node.js',
      outline: `
- Serveur HTTP
	- Présentation du module http
	- Introduction à Express
	- Servir des pages avec Express
	- Relancer automatiquement son serveur avec nodemon
	- Templating avec EJS

- Interaction avec une base de donnée SQL
	- Se connecter à une base donnée SQL avec Knex.js
	- Modéliser et valider ses données avec Objection.js
      `,
      path_id: node.id,
    },
    {
      title: 'Temps réel et authentification avec Node.js',
      outline: `
- Temps réel
	- Rendre son application réactive avec Socket.io
	- Découvrir comment scaler une application réactive avec Redis

- Authentification et sessions
	- Mettre en place une authentification avec Passport.js
	- Sécuriser ses sessions avec Express
	- Scaling et stockage des sessions dans Redis
      `,
      path_id: node.id,
    },
    {
      title: 'Le coeur de Node.js',
      outline: `
- Les modules de base de Node.js
	- Loguer avec console
	- Interagir avec le processus avec process
	- Obtenir des informations sur le système avec os
	- Accéder aux variables globales avec global
	- Utiliser les fonctions utilitaires du module util

- Interactions avec le système de fichiers
	- Définir le chemin d’un fichier avec path
	- Lecture et écriture d’un fichier
      `,
      path_id: node.id,
    },
    {
      title: 'Node.js : Evénements, Flux et tests',
      outline: `
- Evénements
	- Emettre et écouter des évènements asynchrones
	- Gestion des erreurs avec l’événement “error”

- Flux et Buffers
	- Optimiser l’usage de la mémoire avec les Streams
	- Les types de flux
	- Pipeling de flux
	- Lecture et écriture de fichiers en flux

- Tester son application
	- La syntaxe Behavior-driven development (BDD)
	- Tester son code avec Jest
      `,
      path_id: node.id,
    },
    {
      title: 'Déployer et scaler son application Node.js',
      outline: `
- Déployer son application
	- Créer un projet sur Heroku
	- Déployer son application sur Heroku

- Scaler une application Node.js
	- Les limites du single-thread de Node.js
	- Utilisation du mode cluster de Node.js
	- Architecturer une application avec des jobs / workers avec RabbitMQ

- Partager du code côté client
	- Bundler son code avec Webpack
	- Créer des modules isomorphiques
      `,
      path_id: node.id,
    },
    {
      title: 'Node.js : CLI, tests et débogage',
      outline: `
- Création d’outil en ligne de commande
	- Créer un outil en ligne de commande avec minimist ou commander
	- Déployer et packager un outil en ligne de commande

- Tests
	- Utiliser le mode snapshot de Jest
	- Tester son application de bout en bout avec Selenium et Webdriver.js
	- Mesurer sa couverture de test

- Déboguer son application
	- Profiler son application avec l’inspecteur Chrome
	- Investiguer une fuite mémoire
      `,
      path_id: node.id,
    },
  ])

  // React
  await knex('courses').insert([
    {
      title: 'Presentation de React et notions de ES2017',
      outline: `
- Premier pas avec React
	- Histoire et philosophie de React
	- Installation de l'environnement de développement

- Principales nouveautés
	- Déclarer des variables avec let et const
	- Utiliser des template strings
	- Nouvelle syntaxe de classe
	- Destructuration et valeurs par défaut
	- Arrow functions
	- Les promesses et \`async\` / \`await\`

- Modules ES2015
	- Exporter et importer des modules
	- Découper son code de manière optimale
      `,
      path_id: react.id,
    },
    {
      title: 'Les bases de React',
      outline: `
- Présentation de la syntaxe JSX

- Composants et props
	- Stateless functional components
	- Class based components
	- Composer les composants
	- Rendre les composants dans une page HTML

- Typage et outillage
	- Présentation du type-checking avec Flow
	- Définir l'interface de son composant avec les PropTypes
	- Linter son code avec ESLint
	- Formater son code avec Prettier
      `,
      path_id: react.id,
    },
    {
      title: 'Dynamiser ses composants',
      outline: `
- Gestion du state
	- Différence entre le state et les props
	- Utilisation du state

- Events
	- Réagir à des événements
	- Composants contrôlés et non-contrôlés

- Cycle de vie des composants
	- Les méthodes du cycle de vie
	- La gestion des erreurs avec \`componentDidCatch()\`
      `,
      path_id: react.id,
    },
    {
      title: 'Créer sa première application React',
      outline: `
- Architecturer son application
	- Différence entre composition et héritage
	- Introduction aux higher-order components

- CSS in JS
	- Présentation des solutions CSS in JS
	- Styler ses composants avec styled-components

- Créer une application
	- Mettre en place un système de routes avec React Router
	- Récupérer des données avec Apollo et GraphQL
      `,
      path_id: react.id,
    },
    {
      title: 'Tester et déboguer son application',
      outline: `
- Tester son application
	- Tester ses composants avec Jest et Enzyme
	- Tester ses composants stateless avec des snapshots

- Déboguer son application
	- Inspecter ses composants avec l'extension React

- Optimiser son application
	- Auditer les performances de son application
	- Limiter les rendus avec la notion de pureté
      `,
      path_id: react.id,
    },
    {
      title: 'Server-side rendering',
      outline: `
- Les applications React universelles (isomorphic)
	- Pourquoi faire du server-side rendering ?
	- Les avantages et les inconvénients

- Mettre en place du server-side rendering
	- Compatibilité avec React Router
	- Fetcher les données côté serveur avec Apollo

- Découverte de Next.js
      `,
      path_id: react.id,
    },
    {
      title: 'Les bases de Redux',
      outline: `
- Présentation de Redux
	- Le principe Flux
	- Philosophie de Redux

- Première application Redux
	- Implémenter Redux dans son application
	- Architecturer son store Redux
      `,
      path_id: react.id,
    },
    {
      title: 'Aller plus loin avec Redux',
      outline: `
- Les librairies Redux
	- React Router et Redux
	- Créer des formulaires avec React Redux Form
	- Créer avec actions asynchrones avec Redux Thunk
	- Persister son store avec Redux Persist

- Test et débogage
	- Tester ses reducers avec Jest
	- Utiliser l'extension Chrome pour déboguer son state Redux
      `,
      path_id: react.id,
    },
  ])

  // RxJS
  await knex('courses').insert([
    {
      title: 'Initiation à la programmation Réactive',
      outline: `
- Qu'est-ce que la programmation Réactive ?
	- Histoire de la programmation Réactive
	- Les frameworks de programmation Réactive
	- Histoire de RxJS

- Concept de programmation Réactive
	- Flux d'évènements asynchrones
	- Push / Pull
	- Design pattern Observer
	- "Flux d'Évènements" et "Valeur au cours du temps"
	- Les "marble diagrams"
	- La standardisation de la programmation réactive en JavaScript
      `,
      path_id: rx.id,
    },
    {
      title: 'Premier pas avec RxJS',
      outline: `
- Les bases de RxJS
	- Observables / Observers
	- Créer des Observables : \`from\` / \`of\` / \`create\`
	- S'abonner à un Observable : \`subscribe\`
	- Gestion des erreurs
	- Gestions des "subscriptions"
	- Les opérateurs : transformer des observables

- Rappels de programmation fonctionnelle
	- Description d'un opérateur
	- Transformer les évènements : \`map\` / \`scan\`
	- Agir sur la chronologie : \`delay\` / \`buffer\`
	- Filtrer les évènements : \`filter\` / \`debounce\` / \`take\`
	- Combiner les observables : \`concat\` / \`merge\` / \`switch\`
      `,
      path_id: rx.id,
    },
    {
      title: 'Aller plus loin avec RxJS',
      outline: `
- Concepts avancés
	- Hot / Cold observables
	- Observables multicast
	- Subjects
	- Schedulers
	- Tester avec RxJS

- Le TestScheduler
	- Créer des observables pour les tests
	- Vérifier les observables
	- RxJS dans le navigateur
      `,
      path_id: rx.id,
    },
    {
      title: 'Interagir avec son environnement',
      outline: `
- Interagir avec le DOM
	- Faire des appels HTTP
	- Bonnes pratiques
	- RxJS côté serveur

- Streams / EventEmitters vs Observables
	- Interagir avec le système de fichier
	- Interagir avec le réseau
      `,
      path_id: rx.id,
    },
  ])

  // GraphQL
  await knex('courses').insert([
    {
      title: 'Premiers pas avec GraphQL',
      outline: `
- Pourquoi GraphQL ?
	- Les différences entre REST et GraphQL
	- Penser son API sous forme de graphe

- Mise en place d'un serveur GraphQL
	- Introduction à Express
	- Mettre en place un serveur GraphQL avec Express
      `,
      path_id: graphql.id,
    },
    {
      title: 'GraphQL côté serveur',
      outline: `
- Créer son premier schema GraphQL
	- Découvrir comment architecturer une API GraphQL
	- Les types GraphQL
	- Les queries et les mutations
	- Les fragments et les directives

- Explorer son API avec GraphiQL

- Tester son API GraphQL
	- Mise en place de Jest
	- Utiliser les snapshots de Jest pour tester son API
      `,
      path_id: graphql.id,
    },
    {
      title: 'GraphQL côté client',
      outline: `
- Requêter une API GraphQL
	- Utiliser fetch

- Apollo + React
	- Présentation d'Apollo
	- Requêter des données avec Apollo
	- Modifier les données avec les mutations
	- Ajouter une dimension temps réel avec les subscriptions

- Une application complète
	- Gérer les sessions
	- Mettre en place la pagination
      `,
      path_id: graphql.id,
    },
    {
      title: 'Optimiser son API GraphQL',
      outline: `
- Optimisations côté client
	- Politique de cache
	- Tirer partie du cache avec le query splitting
	- Prefetching des données

- Optimisations côté serveur
	- Fetcher les données de manière efficace avec DataLoader

- Scaler une API GraphQL
	- Scaling de GraphQL + Node.js
	- GraphQL au sein d'une architecture micro service
      `,
      path_id: graphql.id,
    },
  ])

  async function fillCourses(trainingSlug, pathTitle, range = null) {
    const path = paths.find(({ title }) => title === pathTitle)
    if (!path) throw new Error(`Path ${pathTitle} not found`)

    const training = await knex('trainings')
      .where({ slug: trainingSlug })
      .first()
    if (!training) throw new Error(`Training ${trainingSlug} not found`)

    let coursesQuery = knex('courses')
      .where({ path_id: path.id })
      .orderBy('id', 'asc')

    if (range) coursesQuery = coursesQuery.offset(range[0]).limit(range[1])

    const courses = await coursesQuery

    await knex('trainings_courses').insert(
      courses.map(({ id: course_id }, index) => ({
        rank: index,
        course_id,
        training_id: training.id,
      })),
    )
  }

  fillCourses('es2017-starter', 'JavaScript', [2, 4])
  fillCourses('es2017', 'JavaScript')
  fillCourses('nodejs-starter', 'Node.js', [0, 4])
  fillCourses('nodejs', 'Node.js')
  fillCourses('react-redux', 'React')
  fillCourses('react', 'React', [0, 6])
  fillCourses('redux', 'React', [6, 2])
  fillCourses('rxjs', 'RxJS')
  fillCourses('graphql', 'GraphQL')
}
