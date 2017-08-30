import loadable from 'loadable-components'

export const Home = loadable(() => import('client/Home'))
export const Story = loadable(() => import('client/Story'))
export const Trainer = loadable(() => import('client/Trainer'))
export const Trainings = loadable(() => import('client/Trainings'))
export const Training = loadable(() => import('client/Training'))
export const TrainingPrint = loadable(() => import('client/TrainingPrint'))
export const Session = loadable(() => import('client/Session'))
export const Contact = loadable(() => import('client/Contact'))
// export const Articles = loadable(() => import('client/Articles'))

// Prefetch routes
Home.load()
Trainings.load()
Training.load()
Session.load()
Story.load()
Contact.load()

export { default as Articles } from 'client/Articles'
export { default as Article } from 'client/Article'
