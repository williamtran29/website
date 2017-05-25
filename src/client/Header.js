import React from 'react'
import { compose, withHandlers, withState } from 'recompact'
import omit from 'lodash/omit'
import { Link } from 'react-router-dom'
import glamorous from 'glamorous'
import Logo from 'client/Logo'
import FaBars from 'react-icons/lib/fa/bars'

const Nav = glamorous.nav(
  {
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0 10px',
    backgroundColor: '#BD4932',
    color: 'white',
    position: 'relative',
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

const Links = glamorous.div(
  {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 'calc(-100% - 70px)',
    willChange: 'transform, opacity',
    transform: 'translateY(0)',
    opacity: 0,
    zIndex: 1,
    transition: 'opacity 300ms, transform 300ms',
    backgroundColor: '#BD4932',
    paddingBottom: '10px',
    '@media(min-width: 700px)': {
      position: 'initial',
      display: 'flex',
      flex: '1 1 600px',
      flexDirection: 'row',
      opacity: 1,
      transform: 'none',
      transition: 'none',
      backgroundColor: 'transparent',
      paddingBottom: 0,
    },
  },
  ({ show, transparent }) => ({
    ...(transparent
      ? {
        backgroundColor: 'transparent',
      }
      : null),
    ...(show
      ? {
        transform: 'translateY(calc(100% + 40px))',
        opacity: 1,
      }
      : {}),
  }),
)

const NavLink = glamorous(props => <Link {...omit(props, ['raised'])} />)(
  {
    fontFamily: "'Roboto', sans-serif",
    lineHeight: '28px',
    fontSize: 18,
    textDecoration: 'none',
    color: 'white',
    padding: '0 20px',
    margin: '5px 0',
    border: '1px solid transparent',
    transition: 'color 200ms, background-color 200ms',
    ':hover': {
      color: 'white',
    },
    '@media(min-width: 700px)': {
      margin: '0',
    },
  },
  ({ raised }) => ({
    ...(raised
      ? {
        borderRadius: '3px',
        border: '1px solid white',
        ':hover': {
          backgroundColor: 'white',
          color: '#BD4932',
        },
      }
      : {}),
  }),
)

const LogoLink = glamorous(Link)({
  flex: '0 0 150px',
  marginRight: 'auto',
  color: 'white',
  position: 'relative',
  zIndex: 2,
})

const MenuToggle = glamorous(FaBars)({
  position: 'relative',
  height: 20,
  width: 'auto',
  cursor: 'pointer',
  '@media(min-width: 700px)': {
    display: 'none',
  },
  zIndex: 2,
})

const Header = compose(
  withState('toggled', 'setToggled', false),
  withHandlers({
    onToggle: ({ setToggled, toggled }) => () => setToggled(!toggled),
  }),
)(({ onToggle, toggled, transparent }) => (
  <Nav transparent={transparent}>
    <LogoLink to="/">
      <Logo />
    </LogoLink>
    <Links show={toggled} transparent={transparent}>
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
    <MenuToggle onClick={onToggle} />
  </Nav>
))

export default Header
