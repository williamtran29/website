/* eslint-disable react/no-danger */
import 'style/bootstrap'
import React from 'react'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { hot } from 'react-hot-loader'
import * as Routes from 'client/Routes'
import * as routePaths from 'modules/routePaths'
import { completeUrl } from 'modules/urlUtil'
import { Status } from 'modules/reactRouter'

const App = ({ location }) => (
  <div>
    <Helmet defaultTitle="Smooth Code - Formations JavaScript, React et GraphQL">
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
        content="Formations JavaScript, React et GraphQL pour les entreprises et les développeurs. Devenez opérationnel en quelques jours."
      />
      <meta
        name="keywords"
        content="formation web, formation développeur, JavaScript, React, ReactJS, Redux, Jest, RxJS, Node.js, MobX, GraphQL"
      />
      <meta
        name="author"
        content="Smooth Code : Formations JavaScript, React et GraphQL"
      />
      <meta property="og:site_name" content="Smooth Code" />
      <meta
        property="og:title"
        content="Smooth Code : Formations JavaScript, React et GraphQL"
      />
      <meta
        property="og:description"
        content="Formations JavaScript, React et GraphQL pour les entreprises et les développeurs. Devenez opérationnel en quelques jours."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={completeUrl(location.pathname)} />
      <meta name="twitter:site" content="@smooth_code" />
      <meta name="twitter:creator" content="@neoziro" />
      <meta name="twitter:card" content="summary" />
      <meta property="twitter:url" content={completeUrl(location.pathname)} />
      <link
        rel="alternate"
        type="application/rss+xml"
        href={completeUrl('/feed.xml')}
      />
    </Helmet>
    <Switch>
      <Route exact path={routePaths.homeRoute()} component={Routes.Home} />
      <Route
        exact
        path={routePaths.trainingPrintRoute(':slug')}
        component={Routes.TrainingPrint}
      />
      <Route
        exact
        path={routePaths.trainingRoute(':slug')}
        component={Routes.Training}
      />
      <Route
        exact
        path={routePaths.sessionRoute(
          ':trainingSlug',
          ':city',
          ':date',
          ':sessionId',
        )}
        component={Routes.Session}
      />
      <Route
        exact
        path={routePaths.trainerRoute(':slug')}
        component={Routes.Trainer}
      />
      <Redirect
        from={routePaths.articlesRoute(1)}
        to={routePaths.latestArticlesRoute()}
      />
      <Route
        exact
        path={routePaths.latestArticlesRoute()}
        component={Routes.Articles}
      />
      <Route
        exact
        path={routePaths.articlesRoute(':page')}
        component={Routes.Articles}
      />
      <Route
        path={routePaths.articleRoute(':slug')}
        component={Routes.Article}
      />
      <Route
        path={routePaths.conditionsRoute()}
        component={Routes.Conditions}
      />
      <Route
        path={routePaths.legalNoticeRoute()}
        component={Routes.LegalNotice}
      />
      <Status code={404}>
        <Routes.NoMatch />
      </Status>
    </Switch>
  </div>
)

const AppWithRouter = withRouter(App)

export default hot(module)(AppWithRouter)
