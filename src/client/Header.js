import React from 'react'
import { Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import { compose, withHandlers, withState } from 'recompact'
import { Link as ScrollLink } from 'react-scroll'
import FaBars from 'react-icons/lib/fa/bars'
import FaGitHub from 'react-icons/lib/fa/github'
import theme from 'style/theme'
import Logo from 'client/Logo'
import { homeRoute, articlesRoute } from 'modules/routePaths'
import FaPhone from 'react-icons/lib/fa/phone'

const Nav = styled.nav`
  padding: 0 20px;
  color: white;
  position: ${({ transparent }) => (transparent ? 'absolute' : 'relative')};
  background-color: ${({ transparent }) =>
    transparent ? 'transparent' : theme.colors.primary};
  left: 0;
  right: 0;

  @media print {
    display: none;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: ${theme.medias.large};
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
  top: calc(-100% - 145px);
  transform: ${props =>
    props.show ? 'translateY(calc(100% - 60px))' : 'translateY(0)'};
  opacity: ${props => (props.show ? 1 : 0)};
  will-change: transform, opacity;
  transition: opacity 300ms, transform 300ms;
  padding-bottom: 10px;
  padding-top: 70px;
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

const NavLink = styled.a`
  line-height: 28px;
  font-size: 15px;
  text-decoration: none;
  color: white;
  padding: 0 10px;
  margin: 5px 0;
  border: 1px solid rgba(0, 0, 0, 0);
  transition: color 200ms, background-color 200ms;
  white-space: nowrap;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: white;
    text-decoration: none;
  }

  > svg {
    margin-right: 5px;
  }

  @media (min-width: ${theme.medias.phablet}) {
    margin: 0;
  }

  @media (min-width: ${theme.medias.desktop}) {
    font-size: 18px;
    padding: 0 20px;
  }
`

const RouterNavLink = NavLink.withComponent(Link)
const ScrollNavLink = NavLink.withComponent(ScrollLink)

const RaisedNavLink = styled(NavLink)`
  border-radius: 3px;
  border: 1px solid white;

  &:hover {
    background-color: white;
    color: ${theme.colors.primary};
  }
`

const BiggerLogo = styled(Logo)`
  width: 125%;
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
      <LogoLink to={homeRoute()}>
        <BiggerLogo />
      </LogoLink>
      <Links show={toggled} transparent={transparent}>
        <Route exact path="/">
          {({ match }) =>
            match ? (
              <ScrollNavLink to="workshops" spy smooth>
                Formations
              </ScrollNavLink>
            ) : (
              <RouterNavLink to={homeRoute()}>Formations</RouterNavLink>
            )
          }
        </Route>
        <RouterNavLink to={articlesRoute()}>Articles</RouterNavLink>
        <NavLink
          href="https://github.com/smooth-code"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGitHub /> Open Source
        </NavLink>
        <RaisedNavLink href="tel:+33987022412">
          <FaPhone /> 09 87 02 24 12
        </RaisedNavLink>
      </Links>
      <MenuToggle onClick={onToggle} />
    </Wrapper>
  </Nav>
))

export default Header
