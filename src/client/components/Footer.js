import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { th, upTo } from 'smooth-ui'
import {
  homeRoute,
  latestArticlesRoute,
  conditionsRoute,
  legalNoticeRoute,
} from 'shared/routePaths'
import FaGitHub from 'react-icons/lib/fa/github'
import FaTwitter from 'react-icons/lib/fa/twitter'
import FaPhone from 'react-icons/lib/fa/phone'
import FaEnvelope from 'react-icons/lib/fa/envelope'
import BaseWrapper from './Wrapper'
import Logo from './Logo'

const Container = styled.footer`
  background-color: ${th('gray800')};
  color: ${th('gray200')};
  font-size: 14px;
  line-height: 22px;
  font-weight: 300;

  a {
    color: ${th('gray200')};
    text-decoration: none;

    &:hover {
      color: ${th('white')};
    }
  }
`

const Wrapper = BaseWrapper.extend`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 20px 35px 20px;

  ${upTo(
    'md',
    css`
      flex-direction: row;
      padding: 60px 10px 55px 10px;
    `,
  )};
`

const Left = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid ${th('gray700')};

  ${upTo(
    'md',
    css`
      padding-bottom: 0;
      border: 0;
    `,
  )};
`

const Links = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 30px 0;
  padding: 0;
  font-size: 16px;
  line-height: 30px;

  ${upTo(
    'md',
    css`
      margin: 0 10vw 30px 0;
    `,
  )};
`

const Right = styled.div`
  padding-top: 20px;
  text-align: right;

  ${upTo(
    'md',
    css`
      padding-top: 0;
    `,
  )};
`

const Section = styled.div`
  margin-bottom: 20px;

  address {
    font-style: normal;
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
    transition: 300ms color;

    &:hover {
      color: white;
    }
  }
`

const FooterLogo = styled(Logo)`
  color: ${th('white')};
  width: 150px;
  margin-left: 20px;
`

const Footer = () => (
  <Container>
    <Wrapper>
      <Left>
        <Links>
          <Link to={homeRoute()}>Formations</Link>
          <Link to={latestArticlesRoute()}>Articles</Link>
          <Link to={conditionsRoute()}>Conditions Générales de Vente</Link>
          <Link to={legalNoticeRoute()}>Mentions Légales</Link>
        </Links>
        <div>© Smooth Code</div>
      </Left>
      <Right>
        <Section>
          <address>
            Smooth Code<br />
            41 rue Réaumur<br />
            75003 Paris
          </address>
        </Section>
        <Section>
          <a href="tel:+33987022412">
            <FaPhone /> 09 87 02 24 12
          </a>
          <br />
          <a href="mailto:contact@smooth-code.com">
            <FaEnvelope /> contact@smooth-code.com
          </a>
        </Section>
        <Section>
          SIRET : 830511788 00010<br />
          Numéro de déclaration d’activité : 11 75 56363 75
        </Section>
        <Social>
          <a
            href="https://github.com/smooth-code/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGitHub />
          </a>
          <a
            href="https://twitter.com/smooth_code"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <FooterLogo />
        </Social>
      </Right>
    </Wrapper>
  </Container>
)

export default Footer
