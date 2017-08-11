import React from 'react'
import { Admin, Resource } from 'admin-on-rest'
import { TrainersList, TrainerEdit, TrainerCreate } from './trainers'
// import { TrainingsList } from './trainings'
import customJsonRestClient from './customJsonRestClient'

const App = () =>
  <Admin restClient={customJsonRestClient('/api')}>
    <Resource
      name="trainers"
      list={TrainersList}
      edit={TrainerEdit}
      create={TrainerCreate}
    />
    {/* <Resource name="trainings" list={TrainingsList} /> */}
  </Admin>

export default App
