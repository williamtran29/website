import React from 'react'
import omit from 'lodash/omit'
import { Link } from 'react-router-dom'
import glamorous from 'glamorous'
import Logo from 'client/Logo'

const Nav = glamorous.nav(
  {
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0 10px',
    backgroundColor: '#BD4932',
  },
  ({ transparent }) => ({
    ...(transparent
      ? {
        position: 'absolute',
        backgroundColor: 'transparent',
        left: 0,
        right: 0,
      }
      : {}),
  }),
)

const Links = glamorous.div({
  flex: '1 1 600px',
  display: 'flex',
  justifyContent: 'flex-end',
})

const NavLink = glamorous(props => <Link {...omit(props, ['raised'])} />)(
  {
    fontFamily: "'Roboto', sans-serif",
    lineHeight: '28px',
    fontSize: 18,
    textDecoration: 'none',
    color: 'white',
    padding: '0 20px',
    ':hover': {
      color: 'white',
    },
  },
  ({ raised }) => ({
    ...(raised
      ? {
        borderRadius: '3px',
        border: '1px solid white',
        ':hover': {
          backgroundColor: '#BD4932',
        },
      }
      : {}),
  }),
)

const HeaderLink = glamorous(Link)({
  width: 150,
  flex: '1 0 150px',
  marginRight: 'auto',
})

const Header = ({ transparent }) => (
  <Nav transparent={transparent}>
    <HeaderLink to="/">
      <Logo width={150} />
    </HeaderLink>
    <Links>
      <NavLink to="/trainings">
        Formations
      </NavLink>
      <NavLink to="/story">
        Notre histoire
      </NavLink>
      <NavLink raised to="/contact">
        Nous contacter
      </NavLink>
    </Links>
  </Nav>
)

export default Header
