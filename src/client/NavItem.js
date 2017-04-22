import React from 'react'
import classNames from 'classnames'
import { Route, withRouter } from 'react-router'
import { Link } from 'react-router-dom'

export default withRouter(({
  to,
  exact,
  strict,
  location,
  children,
}) => (
  <Route
    path={typeof to === 'object' ? to.pathname : to}
    exact={exact}
    strict={strict}
    location={location}
  >
    {({ match }) => (
      <li className={classNames('nav-item', { active: match })}>
        <Link className="nav-link" to={to}>
          {children}
        </Link>
      </li>
    )}
  </Route>
))
