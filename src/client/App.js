/* eslint-disable react/no-danger */
import 'style/bootstrap'
import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  Home,
  Story,
  Trainer,
  Trainings,
  Training,
  Session,
  Contact,
} from 'client/Routes'
import {
  homeRoute,
  storyRoute,
  contactRoute,
  trainerRoute,
  trainingRoute,
  trainingsRoute,
  sessionRoute,
} from 'modules/routePaths'
import { clUrl } from 'modules/cloudinary'

const App = ({ location }) =>
  <div>
    <Helmet
      titleTemplate="Smooth Code - %s"
      defaultTitle="Smooth Code : Formations JavaScript, React et Node.js"
    >
      <html lang="fr" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="theme-color" content="#ffffff" />
      <meta
        name="description"
        content="Formations JavaScript, React et Node.js destinées aux développeurs."
      />
      <meta
        name="keywords"
        content="formation web, formation développeur, JavaScript, React, ReactJS, Redux, Jest, RxJS, Node.js, MobX, GraphQL"
      />
      <meta
        name="author"
        content="Smooth Code : Formations JavaScript, React et Node.js"
      />
      <meta
        property="og:title"
        content="Smooth Code : Formations JavaScript, React et Node.js"
      />
      <meta
        property="og:description"
        content="Formations JavaScript, React et Node.js destinées aux développeurs."
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://www.smooth-code.com${location.pathname}`}
      />
      <meta
        property="og:image"
        content={clUrl('smooth-code-shield', 'c_scale,w_1200')}
      />
      <meta name="twitter:site" content="@smooth_code" />
      <meta name="twitter:creator" content="@neoziro" />
      <meta name="twitter:card" content="summary" />
      <meta
        property="twitter:image"
        content={clUrl('smooth-code-shield', 'c_scale,w_1200')}
      />
    </Helmet>
    <Route exact path={homeRoute()} component={Home} />
    <Route path={storyRoute()} component={Story} />
    <Route exact path={trainingsRoute()} component={Trainings} />
    <Route
      exact
      path={sessionRoute(':trainingSlug', ':sessionId', ':city', ':month')}
      component={Session}
    />
    <Route exact path={trainingRoute(':slug')} component={Training} />
    <Route exact path={trainerRoute(':slug')} component={Trainer} />
    <Route path={contactRoute()} component={Contact} />
  </div>

export default withRouter(App)
