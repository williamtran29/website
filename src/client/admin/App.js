import React from 'react'
import { Admin, Resource } from 'admin-on-rest'
import { TrainersList, TrainerEdit, TrainerCreate } from './trainer'
import { PathsList, PathEdit, PathCreate } from './path'
import { TrainingsList, TrainingEdit, TrainingCreate } from './training'
import { CoursesList, CourseEdit, CourseCreate } from './course'
import customJsonRestClient from './customJsonRestClient'

const App = () =>
  <Admin restClient={customJsonRestClient('/api')}>
    <Resource
      name="trainers"
      list={TrainersList}
      edit={TrainerEdit}
      create={TrainerCreate}
    />
    <Resource
      name="paths"
      list={PathsList}
      edit={PathEdit}
      create={PathCreate}
    />
    <Resource
      name="trainings"
      list={TrainingsList}
      edit={TrainingEdit}
      create={TrainingCreate}
    />
    <Resource
      name="courses"
      list={CoursesList}
      edit={CourseEdit}
      create={CourseCreate}
    />
  </Admin>

export default App
