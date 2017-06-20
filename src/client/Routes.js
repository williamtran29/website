/* eslint-disable global-require */
import syncComponent from 'modules/splitting/syncComponent'

export const Home = syncComponent('Home', require('client/Home'))
export const Story = syncComponent('Story', require('client/Story'))
export const Trainings = syncComponent('Trainings', require('client/Trainings'))
export const Training = syncComponent('Training', require('client/Training'))
export const Contact = syncComponent('Contact', require('client/Contact'))
