import loadable from 'loadable-components'

export const Home = loadable(() => import('client/Home'))
export const Session = loadable(() => import('client/Session'))
export const Trainer = loadable(() => import('client/Trainer'))
export const TrainingPrint = loadable(() => import('client/TrainingPrint'))
export const Articles = loadable(() => import('client/Articles'))
export const Article = loadable(() => import('client/Article'))
export const Conditions = loadable(() => import('client/Conditions'))
export const LegalNotice = loadable(() => import('client/LegalNotice'))
export { default as Training } from 'client/Training'
export { default as NoMatch } from 'client/NoMatch'

// Prefetch routes
Home.load()
Session.load()
Articles.load()
Article.load()
Trainer.load()
