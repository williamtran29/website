import 'style/bootstrap'
import React from 'react'
import { Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Home from 'client/Home'
import Story from 'client/Story'
import Trainings from 'client/Trainings'
import Contact from 'client/Contact'

export default () =>
  <div>
    <Helmet titleTemplate="Smooth Code - %s" defaultTitle="Smooth Code">
      <html lang="fr" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
    <Route exact path="/" component={Home} />
    <Route path="/story" component={Story} />
    <Route path="/trainings" component={Trainings} />
    <Route path="/contact" component={Contact} />
  </div>
