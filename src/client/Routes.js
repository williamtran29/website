import { asyncComponent } from 'modules/splitting'

export const Home = asyncComponent(() => import('client/Home'))
export const Story = asyncComponent(() => import('client/Story'))
export const Trainings = asyncComponent(() => import('client/Trainings'))
export const Training = asyncComponent(() => import('client/Training'))
export const Contact = asyncComponent(() => import('client/Contact'))
