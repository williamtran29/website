import React from 'react'
// import GrommetApp from 'grommet/components/App'
import { Route } from 'react-router-dom'
import Header from './Header'

const Home = () => <div>hello</div>
const About = () => <div>about</div>

export default () => (
  <div>
    <Header />
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </div>
)
