import loadable from 'loadable-components'

export const Home = loadable(() => import('client/Home'))
export const Story = loadable(() => import('client/Story'))
export const Trainer = loadable(() => import('client/Trainer'))
export const Trainings = loadable(() => import('client/Trainings'))
export const Training = loadable(() => import('client/Training'))
export const Session = loadable(() => import('client/Session'))
export const Contact = loadable(() => import('client/Contact'))

// Prefetch everything
Home.load()
Trainings.load()
Training.load()
Session.load()
Story.load()
Contact.load()
