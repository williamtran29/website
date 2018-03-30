import loadable from 'loadable-components'

export const Home = loadable(() => import('./home/Home'))
export const Session = loadable(() => import('./Session'))
export const Trainer = loadable(() => import('./Trainer'))
export const TrainingPrint = loadable(() => import('./TrainingPrint'))
export const Articles = loadable(() => import('./Articles'))
export const Article = loadable(() => import('./Article'))
export const Conditions = loadable(() => import('./Conditions'))
export const LegalNotice = loadable(() => import('./LegalNotice'))
export { default as Training } from './Training'
export { default as NoMatch } from './NoMatch'

// Prefetch routes
Home.load()
Session.load()
Articles.load()
Article.load()
Trainer.load()
