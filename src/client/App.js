import React from 'react'
import { Route } from 'react-router-dom'
import Header from 'client/Header'
import Home from 'client/Home'
import About from 'client/About'

export default () => (
  <div>
    <Header />
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </div>
)
