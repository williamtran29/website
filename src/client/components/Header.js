import React from 'react'
import { Route, Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { th, up } from 'smooth-ui'
import { Link as ScrollLink } from 'react-scroll'
import FaBars from 'react-icons/lib/fa/bars'
import FaGitHub from 'react-icons/lib/fa/github'
import FaPhone from 'react-icons/lib/fa/phone'
import { homeRoute, latestArticlesRoute } from 'shared/routePaths'
import Logo from './Logo'
import Toggler from './Toggler'

const Nav = styled.nav`
  padding: 0 20px;
  color: ${th('white')};
  position: ${({ transparent }) => (transparent ? 'absolute' : 'relative')};
  background-color: ${({ transparent }) =>
    transparent ? 'transparent' : th('primary')};
  left: 0;
  right: 0;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: ${th('wrapperWidth')};
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
    props.show ? css`translateY(calc(100% - 60px));` : css`translateY(0);`};
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 300ms, transform 300ms;
  padding-bottom: 10px;
  padding-top: 70px;
  background-color: ${props =>
    props.transparent ? 'rgba(0, 0, 0, 0.9)' : th('primary')};
  z-index: 3;

  ${up(
    'md',
    css`
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
    `,
  )};
`

const NavLink = styled.a`
  line-height: 28px;
  font-size: 15px;
  text-decoration: none;
  color: ${th('white')};
  padding: 0 10px;
  margin: 5px 0;
  border: 1px solid transparent;
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

  ${up(
    'md',
    css`
      margin: 0;
    `,
  )};

  ${up(
    'lg',
    css`
      font-size: 18px;
      padding: 0 20px;
    `,
  )};
`

const RouterNavLink = NavLink.withComponent(Link)
const ScrollNavLink = NavLink.withComponent(ScrollLink)

const RaisedNavLink = styled(NavLink)`
  border-radius: ${th('borderRadius')};
  border: 1px solid ${th('white')};

  &:hover {
    background-color: ${th('white')};
    color: ${th('primary')};
  }
`

const BiggerLogo = styled(Logo)`
  width: 125%;
`

const LogoLink = styled(Link)`
  flex: 0 0 150px;
  margin-right: auto;
  color: ${th('white')};
  position: relative;
  z-index: 4;
`

const MenuToggle = styled(FaBars)`
  position: relative;
  height: 20px;
  width: auto;
  cursor: pointer;
  z-index: 4;

  ${up(
    'md',
    css`
      display: none;
    `,
  )};
`

const Header = ({ transparent }) => (
  <Nav transparent={transparent}>
    <Toggler>
      {({ toggled, onToggle }) => (
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
            <RouterNavLink to={latestArticlesRoute()}>Articles</RouterNavLink>
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
      )}
    </Toggler>
  </Nav>
)

export default Header
