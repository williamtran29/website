import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers, withState } from 'recompact'
import theme from 'style/theme'
import { Link } from 'react-router-dom'
import Logo from 'client/Logo'
import FaBars from 'react-icons/lib/fa/bars'

const Nav = styled.nav`
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 10px;
  color: white;
  position: ${({ transparent }) => (transparent ? 'absolute' : 'relative')};
  background-color: ${({ transparent }) => (transparent ? 'transparent' : theme.colors.primary)};
  left: 0;
  right: 0;
`

const Links = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: calc(-100% - 70px);
  will-change: transform, opacity;
  transform: ${props => (props.show ? 'translateY(calc(100% + 40px))' : 'translateY(0)')};
  opacity: ${props => (props.show ? 1 : 0)};
  z-index: 1;
  transition: opacity 300ms, transform 300ms;
  padding-bottom: 10px;
  background-color: ${props => (props.transparent ? 'transparent' : theme.colors.primary)};
  @media (min-width: 700px) {
    position: initial;
    display: flex;
    flex: 1 1 600px;
    flex-direction: row;
    opacity: 1;
    transform: none;
    transition: none;
    background-color: transparent;
    padding-bottom: 0;
  }
`

const NavLink = styled(Link)`
  line-height: 28px;
  font-size: 18px;
  text-decoration: none;
  color: white;
  padding: 0 20px;
  margin: 5px 0;
  border: 1px solid transparent;
  transition: color 200ms, background-color 200ms;
  &:hover {
    color: white;
  }
  @media (min-width: 700px) {
    margin: 0;
  }
`

const RaisedNavLink = NavLink.extend`
  border-radius: 3px;
  border: 1px solid white;
  &:hover {
    background-color: white;
    color: ${theme.colors.primary};
  }
`

const LogoLink = styled(Link)`
  flex: 0 0 150px;
  margin-right: auto;
  color: white;
  position: relative;
  z-index: 2;
`

const MenuToggle = styled(FaBars)`
  position: relative;
  height: 20px;
  width: auto;
  cursor: pointer;
  z-index: 2;
  @media (min-width: 700px) {
    display: none;
  }
`

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
      <RaisedNavLink to="/contact">
        Nous contacter
      </RaisedNavLink>
    </Links>
    <MenuToggle onClick={onToggle} />
  </Nav>
))

export default Header
