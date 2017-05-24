import 'glamor/reset'
import React from 'react'
import { Route } from 'react-router-dom'
import Home from 'client/Home'
import Story from 'client/Story'
import Trainings from 'client/Trainings'

export default () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/story" component={Story} />
    <Route path="/trainings" component={Trainings} />
  </div>
)
