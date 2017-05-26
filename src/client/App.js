import 'client/bootstrap/style'
import { ThemeProvider } from 'glamorous'
import React from 'react'
import { Route } from 'react-router-dom'
import theme from 'client/theme'
import Home from 'client/Home'
import Story from 'client/Story'
import Trainings from 'client/Trainings'

export default () => (
  <ThemeProvider theme={theme}>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/story" component={Story} />
      <Route path="/trainings" component={Trainings} />
    </div>
  </ThemeProvider>
)
