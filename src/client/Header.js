import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers, withState } from 'recompact'
import theme from 'style/theme'
import { Link } from 'react-router-dom'
import Logo from 'client/Logo'
import FaBars from 'react-icons/lib/fa/bars'
import {
  storyRoute,
  contactRoute,
  trainingsRoute,
  articlesRoute,
} from 'modules/routePaths'

const Nav = styled.nav`
  padding: 0 10px;
  color: white;
  position: ${({ transparent }) => (transparent ? 'absolute' : 'relative')};
  background-color: ${({ transparent }) =>
    transparent ? 'transparent' : theme.colors.primary};
  left: 0;
  right: 0;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: ${theme.medias.xl};
  height: 55px;
  margin: 0 auto;
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
  transform: ${props =>
    props.show ? 'translateY(calc(100% - 60px))' : 'translateY(0)'};
  opacity: ${props => (props.show ? 1 : 0)};
  will-change: transform, opacity;
  transition: opacity 300ms, transform 300ms;
  padding-bottom: 10px;
  padding-top: 50px;
  background-color: ${props =>
    props.transparent ? 'rgba(0, 0, 0, 0.9)' : theme.colors.primary};
  z-index: 3;

  @media (min-width: ${theme.medias.phablet}) {
    position: initial;
    display: flex;
    flex: 1 1 600px;
    flex-direction: row;
    opacity: 1;
    transform: none;
    transition: none;
    background-color: transparent;
    padding-bottom: 0;
    padding-top: 0;
  }
`

const NavLink = styled(Link)`
  line-height: 28px;
  font-size: 18px;
  text-decoration: none;
  color: white;
  padding: 0 20px;
  margin: 5px 0;
  border: 1px solid rgba(0, 0, 0, 0);
  transition: color 200ms, background-color 200ms;

  &:hover {
    color: white;
    text-decoration: none;
  }

  @media (min-width: ${theme.medias.phablet}) {
    margin: 0;
  }
`

const RaisedNavLink = styled(NavLink)`
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
  z-index: 4;
`

const MenuToggle = styled(FaBars)`
  position: relative;
  height: 20px;
  width: auto;
  cursor: pointer;
  z-index: 4;
  @media (min-width: ${theme.medias.phablet}) {
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
    <Wrapper>
      <LogoLink to="/">
        <Logo />
      </LogoLink>
      <Links show={toggled} transparent={transparent}>
        <NavLink to={trainingsRoute()}>Formations</NavLink>
        <NavLink to={articlesRoute()}>Articles</NavLink>
        <NavLink to={storyRoute()}>Notre histoire</NavLink>
        <RaisedNavLink to={contactRoute()}>Nous contacter</RaisedNavLink>
      </Links>
      <MenuToggle onClick={onToggle} />
    </Wrapper>
  </Nav>
))

export default Header
