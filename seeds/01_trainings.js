exports.seed = async knex => {
  await knex('trainings').truncate()
  await knex('trainings').insert([
    {
      name: 'JavaScript ES2017',
      abstract:
        'Découvrez les nouveautés apportées par ES6 / ES2015, ES2016 et ES2017',
      color: '#313131',
      duration: 4,
      price: 2000,
      description: `JavaScript est un langage en perpétuelle évolution, chaque année des nouveautés y sont apportées. La formation **JavaScript ES2017** se focalise sur les innovations apportées au langage par **ES2015 (ES6)**, **ES2016** et **ES2017**.

Nous présenterons la **destructuration**, les **modules**, les **arrow functions**, les **classes** et les **générateurs**. Nous aborderons aussi la gestion de l’asynchrone de manière élégante avec les **promises** et **async / await**. Côté outillage nous parlerons de **Babel**, **Webpack** et **ESLint** pour vous permettre d'intégrer les nouvelles fonctionnalités dans vos projets.

Un projet sera réalisé en fil rouge. Vous pourrez ainsi mettre en pratique les nouveautés évoquées tout au long de la formation.

### Objectifs
- Découvrir les nouveautés apportées par ES2015 (ES6), ES2016 et ES2017
- Être capable d’utiliser ces nouveautés en production dès le lendemain

### Pré-requis
- Notions de base en développement ou connaissance d'un autre langage de programmation.`,
      outline: `### Jour 1

#### Qu’est-ce que JavaScript ?
- Historique
- Node.js

#### Les bases du langage
- Variables
- Fonctions
- Prototypes
- Objets
- Tableaux
- For...in
- Mode strict

### Jour 2

#### Introduction à ES2017
- ES2017 c’est quoi ?
- Support des navigateurs

#### Outillage
- Transpiler avec Babel
- Bundler avec Webpack
- Linter avec ESLint

#### Data
- Number and Math
- String
- Template strings
- Variables et scope
- Symbols
- Destructuring
- Spread operator
- Objects

### Jour 3

#### Modularité
- Modules
- Arrow functions
- Classes

####  Collections
- Array
- For...of
- Iterables
- Generators
- Maps and Sets
- Typed Arrays

### Jour 4

#### Asynchrone
- Problems
- Promises
- Async / Await

#### Divers
- Proxies`,
      cloudinary_id: 'training-javascript',
      slug: 'formation-javascript-es2017',
    },
    {
      name: 'Node.js',
      abstract: 'Libérez la puissance du JavaScript côté serveur.',
      color: '#0b1209',
      duration: 4,
      price: 2000,
      description: `En quelques années Node.js a complètement révolutionné le développement des applications web. Offrant des **performances optimales** et une **flexibilité sans égale**, Node.js a su s'imposer comme le choix de prédilection pour concevoir des applications web. **Basé sur le moteur V8 du navigateur Chrome**, il permet de **faire tourner le même code côté client et côté serveur**. Node.js tire également sa force de son **gestionnaire de paquet "npm"** qui contabilise plus de **475 000 modules disponibles**.

Utilisé par tous [**les géants du web**](https://nodejs.org/en/foundation/case-studies/), Node.js est aujourd'hui incontournable. En plus de permettre la **création d'applications web réactives grâce à WebSocket**, Node.js permet d'utiliser les **nouveaux outils de développement en ligne de commande** comme Webpack, Babel ou ESLint.

Dans cette formation vous découvrirez comment écrire du code **JavaScript moderne (ES2017) avec [Babel](https://babeljs.io/)**, profiter de l'écosystème grâce à **[npm](https://www.npmjs.com) et ses modules**,  maîtriser **l'asynchrone avec \`async\` / \`await\`**,  créer un **serveur web avec [Express](https://expressjs.com/) ou [Koa](http://koajs.com/)**,  créer des **interfaces réactives avec [Socket.io](https://socket.io/)** et écrire du **code isomorphique (client et serveur)**, **se connecter à une base de données avec [knex](http://knexjs.org/)**, **tester son code avec [Jest](https://facebook.github.io/jest/)**.

Un projet complet sera réalisé en fil rouge durant toute la formation, cela vous permettra de mettre en pratique toutes les nouveautés qui vous seront présentées.

### Objectifs
- Savoir installer et utiliser Node.js et npm
- Comprendre le fonctionnement de Node.js
- Savoir créer une application web avec Node.js
- Apprendre à structurer son code de manière optimale
- Être capable de tester son code Node.js

### Pré-requis
- Des bases en JavaScript
- Notions de fonctionnement basiques du web (client, server, HTTP,  requêtes, etc...)`,
      outline: `### Jour 1 - Introduction à Node.js

#### Introduction
- Histoire de Node.js
- Installer et mettre à jour Node.js avec nvm
- Créer son premier programme Node.js

#### ES2017
- Présentation de l'évolution du langage JavaScript
- Compatibilité avec Node.js
- Utiliser le JavaScript de demain avec Babel
- Destructuration et valeurs par défaut
- Rest and spread
- Template strings
- \`let\` et \`const\`
- Arrow functions
- Modules ES2015

#### Modulariser son code
- Utilisation de la syntaxe ES2015 en Node.js
- Différence avec la syntaxe \`require\`
- Exporter et importer des modules
- Découper son code de manière optimale

#### Asynchrone
- Historique de l'asynchrone
- Les callbacks "node style"
- Les promesses
- \`async\` / \`await\`

### Jour 2 - Les bases de Node.js

#### Les modules de bases de node
- \`console\`
- \`process\` et \`os\`
- \`global\`
- \`url\` et \`util\`

#### Evénements et flux
- EventEmitter
- Streams
- Buffers
- Interactions avec le système de fichiers

#### Utilisation de npm & yarn
- Installer des modules
- Gérer et sécuriser les dépendances de son projet
- Anatomie de \`package.json\`
- Comment choisir ses modules ?
- Publier un module npm

#### Formatter et Linter son code
- Formatter son code avec Prettier
- Linter son code avec ESLint

#### Tester et déboguer son application
- La syntaxe BDD
- Tester son code avec Jest
- Connaître sa couverture de tests

### Jour 3 - Création d'une application web avec Node.js

#### Bootstap d'une application web
- Structurer son code
- Le module \`http\` de node
- Présentation de Express et Koa
- Servir des pages avec Koa
- Relancer automatiquement son serveur avec nodemon
- Templating avec EJS

#### Interaction avec une base de donnée
- Se connecter à une base donnée SQL avec Knex.js
- Utiliser des modèles
- Persister ses données

#### Authentification et sessions
- Authentification avec Passport.js
- Sécuriser les sessions en Node.js

### Jour 4 - Aller plus loin avec Node.js

#### Test, debug et optimisation
- Tester son code de bout en bout avec Selenium et Webdriver
- Déboguer et optimiser son code avec l'inspecteur Chrome

#### Websockets
- Rendre son application reactive avec Socket.io
- Découvrir comment scaler une application reactive

#### Création d'outil en ligne de commande
- Utiliser minimist ou commander
- Déployer et packager un outil en ligne de commande

#### Isomorphisme
- Compiler son code pour le browser avec Webpack
- Utiliser le même code côté client et serveur avec React

#### Scaler une application Node.js
- Utilisation du mode cluster de Node.js
- Créer des jobs / workers`,
      cloudinary_id: 'nodejs_jxent0',
      slug: 'formation-nodejs',
    },
    {
      name: 'React',
      abstract:
        'Apprenez à créer des interfaces web modernes, fluides et interactives',
      color: '#1a434a',
      duration: 3,
      price: 1500,
      description: `React est un moteur de rendu développé par Facebook se démarquant de la concurrence grâce à son architecture innovante, efficace et performante. React a maintenant une place incontestable dans l'écosystème JavaScript.


Pendant cette formation, vous découvrirez l'univers React et comment l'utiliser de façon optimale dans vos projets. Nous aborderons tous les aspects de React : sa philosophie, les **components**, les **applications isomorphiques**, mais aussi **comment bien architecturer son application**, l'**optimiser** et la **déboguer**. Nous vous accompagnerons dans l'installation d'un environnement optimal pour le développement en React avec les outils : **Atom**, **Babel**, **Prettier** et **ESLint**.

Un projet complet sera réalisé en fil rouge durant toute la formation pour vous permettre de mettre en pratique chacune des nouveautés présentées.

### Objectifs
- Découvrir React et maîtriser ses particularités
- Construire votre première application React en respectant les bonnes pratiques
- Utiliser les outils de développement adaptés
- Installer, configurer et utiliser les bibliothèques nécessaires
- Savoir comment intégrer React dans vos projets dès le lendemain

### Pré-requis
- Niveau JavaScript intermédiaire`,
      outline: `### Jour 1
- Histoire et philosophie de React
- Installation de l'environnement de développement
- Rappel des bases ES2017
- Syntaxe JSX avec Babel
- Components et Props
- Prettier et ESLint

### Jour 2

- Type-checking avec Flow ou les PropTypes
- Le State
- Le cycle de vie des components
- Formulaires et events (controlled / uncontrolled components)
- Architecturer son application (composition et héritage)

### Jour 3

- Interaction avec le DOM
- Optimisation des performances
- Introduction à la gestion du state avec Redux
- React server-side (isomorphic / universal applications)
`,
      cloudinary_id: 'training-react',
      slug: 'formation-react',
    },
    {
      name: 'RxJS',
      abstract: 'Maîtrisez la programmation réactive',
      color: '#400127',
      duration: 2,
      price: 1000,
      description: `La programmation fonctionnelle est maintenant incontournable dans l'écosystème JavaScript. Mise en avant par Lodash, puis par React et Redux, elle ouvre de nouvelles portes dans le développement web. La programmation Réactive peut être considérée comme l'étape suivante à la programmation fonctionnelle. Popularisée par Angular, le type Observable (cœur de la programmation Réactive) est en cours de standardisation et fera bientôt partie du langage.

La programmation Réactive Fonctionnelle permet de modéliser du code asynchrone sous la forme d'une simple collection avec une dimension temporelle. Très puissante, elle peut-être cependant difficile à appréhender.

RxJS est la bibliothèque la plus complète et la plus populaire pour appliquer ce paradigme. Elle est notamment utilisée dans Angular, ce qui fait d'elle une librairie incontournable.

Dans cette formation vous comprendrez la différence d'approche **pull / push**, le pattern **Observable** et **Observer** et l'**API RxJS dans des cas d'utilisation réels**.

Plusieurs exercices concrets tout au long de la formation vous permettront de mettre en pratique les concepts vus lors de ces deux jours.

### Objectifs
- Comprendre le paradigme de programmation réactive
- Maitriser la librairie RxJS (Développement et Test)
- Savoir appliquer la programmation réactive sur des cas réels

### Pré-requis
- Niveau intermédiaire en JavaScript`,
      outline: `### Jour 1

#### Introduction
- Histoire de la programmation Réactive
- Les frameworks de programmation Réactive
- Histoire de RxJS

#### La programmation réactive
- Flux d'évènements asynchrones
- Push / Pull
- Design pattern Observer
- "Flux d'Évènements" et "Valeur au cours du temps"
- Les "marble diagrams"
- La standardisation de la programmation réactive en JavaScript

#### Les bases de RxJS
- Observables / Observers
- Créer des Observables : from / of / create
- S'abonner à un Observable : subscribe
- Gestion des erreurs
- Gestions des "subscriptions"

#### Les opérateurs : transformer des observables
- Rappels de programmation fonctionnelle
- Description d'un opérateur
- Transformer les évènements : map / scan
- Agir sur la chronologie : delay / buffer
- Filtrer les évènements : filter / debounce / take
- Combiner les observables : concat / merge / switch

### Jour 2

#### Concepts avancés
- Hot / Cold observables
- Observables multicast
- Subjects
- Schedulers

#### Tester avec RxJS
- Le TestScheduler
- Créer des observables pour les tests
- Vérifier les observables

#### RxJS dans le navigateur
- Interagir avec le DOM
- Faire des appels HTTP
- Bonnes pratiques

#### RxJS côté serveur
- Streams / EventEmitters vs Observables
- Interagir avec le FS
- Interagir avec le réseau`,
      cloudinary_id: 'training-rxjs',
      slug: 'formation-rxjs',
    },
    {
      name: 'GraphQL',
      abstract: 'Créez des API modernes et évolutives avec GraphQL',
      color: '#171E26',
      duration: 2,
      price: 1000,
      description: `GraphQL est une spécification de requêtes permettant de structurer les réponses à volonté. Elle donne lieu à une nouvelle manière de concevoir des API. En 2012, Facebook se sentait bridé par les limitations des API REST traditionnelles, et a donc conçu GraphQL, une API caractérisée par un seul point d'accès et une architecture sous forme de graphe.

Dans cette formation vous découvrirez **une présentation rapide de GraphQL**. S'ensuivra un comparatif entre **une API GraphQL et une API REST traditionnelle**. Vous explorerez l'ensemble de la spécification, les **Query**, les **Types**, les **Mutations**, les **Fragments** et apprendrez comment l'utiliser dans vos projets de manière concrète.

Un projet complet sera réalisé en fil rouge durant toute la formation, cela vous permettra de mettre en pratique chacune des nouveautés au fil de la formation.

### Objectifs
- Se familiariser avec GraphQL
- Imaginer et modéliser une API GraphQL
- Déployer et utiliser une API GraphQL dans un environnement JavaScript

### Pré-requis
- Notions de fonctionnement basiques du web (client, server, HTTP,  requêtes, etc...)
- Des bases en Node.js
- Des bases en React`,
      outline: `### Jour 1

#### Introduction
- Histoire de GraphQL
- API REST VS API GraphQL
- Penser son API sous forme de graphe

#### GraphQL coté server
- Mise en place d'un serveur GraphQL (express, koa)
- Définir un schéma
- Tester son API
- Explorer son API avec GraphiQL

### Jour 2

#### GraphQL côté client
- Consommation d'une API GraphQL ([Fetch API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API), [Apollo](https://www.apollodata.com/))
- Créer des requêtes à l'aide des fragments
- Modifier des données à l'aide des mutations
- Gérer la pagination

#### Optimiser et sécuriser
- Cacher les données de manière efficace
- Optimiser les performances de son API avec DataLoader
- Sécuriser son API GraphQL`,
      cloudinary_id: 'training-graphql',
      slug: 'formation-graphql',
    },
    {
      name: 'Jest',
      abstract: 'Passez à la vitesse supérieure en matière de test JavaScript',
      color: '#99424F',
      duration: 1,
      price: 500,
      description: `Jest est le framework de test développé et  utilisé par Facebook. Créé en 2014, il s'est imposé comme référence en tant que framework de tests JavaScript. Jest permet d'optimiser le temps passé à écrire les tests en fournissant un environnement unifié et performant pour une expérience optimale. Il a notamment popularisé le snapshot testing.

Dans cette formation nous verrons comment utiliser Jest pour **tester vos composants React** et **tester votre code côté serveur (Node.js)**. Nous explorerons ensemble le système d'**assertions**, de **mocking** ainsi que le **snapshot testing**. Nous verrons également comment implémenter une **couverture de code simple et efficace avec codecov**.

Nous implémenterons des tests sur des exemples précis pour  vous permettre de faire le parallèle avec vos projets.

### Objectifs
- Maîtriser les meilleures pratiques de test pour des composants React avec Jest
- Savoir utiliser Jest pour tester des modules Node.js

### Pré-requis
- Notions de base en React
- Notions de base en Node.js`,
      outline: `#### Introduction
- Présentation de Jest
- Tour d'horizon des autres frameworks de tests

#### Les bases
- Installer Jest dans un projet
- Le watch mode
- Rappel sur la syntaxe BDD (Behaviour Driven Development)

#### React & Jest
- Utiliser les snapshots
- Tester des composants avec enzyme
- Tester un store Redux

#### Node.js & Jest
- Découvrir le système de mocking
- Tester du code asynchrone
- Monitorer la couverture de tests de son code
`,
      cloudinary_id: 'training-jest',
      slug: 'formation-jest-react',
    },
  ])
}
