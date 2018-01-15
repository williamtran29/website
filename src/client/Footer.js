import React from 'react'
import { lighten } from 'polished'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import theme from 'style/theme'
import Logo from 'client/Logo'
import {
  homeRoute,
  articlesRoute,
  conditionsRoute,
  legalNoticeRoute,
} from 'modules/routePaths'
import FaGitHub from 'react-icons/lib/fa/github'
import FaTwitter from 'react-icons/lib/fa/twitter'
import FaPhone from 'react-icons/lib/fa/phone'
import FaEnvelope from 'react-icons/lib/fa/envelope'

const textColor = lighten(0.6, theme.colors.grayDark)

const Container = styled.footer`
  background-color: ${theme.colors.grayDark};
  color: ${textColor};
  font-size: 14px;
  line-height: 1.6;
  font-weight: 300;

  @media print {
    background-color: #fff;
    color: #333;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${theme.medias.large};
  justify-content: space-between;
  padding: 40px 20px 35px 20px;

  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;
    padding: 60px 10px 55px 10px;
    margin: 0 auto;
  }

  @media print {
    padding: 0 20px;
  }
`

const Left = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid ${lighten(0.1, theme.colors.grayDark)};

  @media (min-width: ${theme.medias.phablet}) {
    padding-bottom: 0;
    border: 0;
  }
`

const LinkColumns = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;
  }

  @media print {
    display: none;
  }
`

const Right = styled.div`
  padding-top: 20px;
  @media (min-width: ${theme.medias.phablet}) {
    padding-top: 0;
  }
`

const Links = styled.ul`
  list-style-type: none;
  margin: 0 0 30px 0;
  padding: 0;

  a {
    font-size: 16px;
    color: ${textColor};
    line-height: 30px;
    text-decoration: none;
  }

  @media (min-width: ${theme.medias.phablet}) {
    margin: 0 10vw 30px 0;
  }
`

const Copyright = styled.div`
  font-size: 14px;

  @media print {
    display: none;
  }
`

const Contact = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 30px;

  a {
    text-decoration: none;
    color: ${textColor};
    will-change: color;
    transition: 300ms color;

    &:hover {
      color: white;
    }
  }

  @media print {
    margin: 0;
    a {
      color: ${theme.colors.grayDark};
    }
  }
`

const Legal = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 30px;

  @media print {
    display: none;
  }
`

const Address = styled.address`
  font-style: normal;
  text-align: right;
  margin-bottom: 20px;

  @media print {
    display: none;
  }
`

const Social = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  font-size: 28px;
  justify-content: flex-end;

  a {
    margin-left: 8px;
    color: ${textColor};
    will-change: color;
    transition: 300ms color;

    &:hover {
      color: white;
    }
  }

  @media print {
    display: none;
  }
`

const FooterLogo = styled(Logo)`
  color: white;
  width: 150px;
  margin-left: 20px;
`

const Footer = () => (
  <Container>
    <Wrapper>
      <Left>
        <LinkColumns>
          <Links>
            <li>
              <Link to={homeRoute()}>Formations</Link>
            </li>
            <li>
              <Link to={articlesRoute()}>Articles</Link>
            </li>
            <li>
              <Link to={conditionsRoute()}>Conditions Générales de Vente</Link>
            </li>
            <li>
              <Link to={legalNoticeRoute()}>Mentions Légales</Link>
            </li>
          </Links>
        </LinkColumns>
        <Copyright>© Smooth Code</Copyright>
      </Left>
      <Right>
        <Address>
          Smooth Code<br />
          41 rue Réaumur<br />
          75003 Paris<br />
        </Address>
        <Contact>
          <a href="tel:+33987022412">
            <FaPhone /> 09 87 02 24 12
          </a>
          <a href="mailto:contact@smooth-code.com">
            <FaEnvelope /> contact@smooth-code.com
          </a>
        </Contact>
        <Legal>
          <span>SIRET : 830511788 00010</span>
          <span>Numéro de déclaration d’activité : 11 75 56363 75</span>
        </Legal>

        <Social>
          <a
            href="https://github.com/smooth-code/"
            target="_blank"
            rel="noopener noreferrer">
            <FaGitHub />
          </a>
          <a
            href="https://twitter.com/smooth_code"
            target="_blank"
            rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <FooterLogo />
        </Social>
      </Right>
    </Wrapper>
  </Container>
)

export default Footer
