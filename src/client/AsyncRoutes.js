import asyncComponent from 'modules/splitting/asyncComponent'

export const Home = asyncComponent('Home', () =>
  import(/* webpackChunkName: "Home" */ 'client/Home'),
)
export const Story = asyncComponent('Story', () =>
  import(/* webpackChunkName: "Story" */ 'client/Story'),
)
export const Trainings = asyncComponent('Trainings', () =>
  import(/* webpackChunkName: "Trainings" */ 'client/Trainings'),
)
export const Training = asyncComponent('Training', () =>
  import(/* webpackChunkName: "Training" */ 'client/Training'),
)
export const Contact = asyncComponent('Contact', () =>
  import(/* webpackChunkName: "Contact" */ 'client/Contact'),
)
