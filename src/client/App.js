import React from 'react'
import {
  Route,
  Link,
} from 'react-router-dom'

const Home = () => <div>hello</div>
const About = () => <div>about</div>

export default () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>

    <hr />

    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </div>
)
