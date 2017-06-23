import loadable from 'loadable-components'

export const Home = loadable(() => import('client/Home'))
export const Story = loadable(() => import('client/Story'))
export const Trainings = loadable(() => import('client/Trainings'))
export const Training = loadable(() => import('client/Training'))
export const Contact = loadable(() => import('client/Contact'))
