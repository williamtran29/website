import React from 'react'
import { lighten } from 'polished'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import theme from 'style/theme'
import Logo from 'client/Logo'
import FaFacebook from 'react-icons/lib/fa/facebook'
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
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${theme.medias.xl};
  justify-content: space-between;
  padding: 40px 20px 35px 20px;
  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;
    padding: 60px 50px 55px 50px;
    margin: 0 auto;
  }
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  border-bottom: 1px solid ${lighten(0.1, theme.colors.grayDark)};
  @media (min-width: ${theme.medias.phablet}) {
    padding-bottom: 0;
    border: 0;
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
  margin: 0 0 30px;
  padding: 0;

  a {
    font-size: 16px;
    color: ${textColor};
    line-height: 30px;
    text-decoration: none;
  }
`

const Copyright = styled.div`
  font-size: 14px;
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
`

const Address = styled.address`
  font-style: normal;
  text-align: right;
  margin-bottom: 20px;
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
`

const FooterLogo = styled(Logo)`
  color: white;
  width: 150px;
  margin-left: 20px;
`

const Footer = () =>
  <Container>
    <Wrapper>
      <Left>
        <Links>
          <li><Link to="/trainings">Formations</Link></li>
          <li><Link to="/story">Notre histoire</Link></li>
          <li><Link to="/contact">Nous contacter</Link></li>
        </Links>
        <Copyright>© Smooth Code</Copyright>
      </Left>
      <Right>
        <Address>
          Smooth Code<br />
          41 rue Réaumur<br />
          75003 Paris<br />
        </Address>
        <Contact>
          <a href="tel:+33650588079"><FaPhone /> 06 50 58 80 79</a>
          <a href="mailto:contact@smooth-code.com">
            <FaEnvelope /> contact@smooth-code.com
          </a>
        </Contact>
        <Social>
          <a href="https://www.facebook.com/smoothcodetraining/">
            <FaFacebook />
          </a>
          <a href="https://twitter.com/smooth_code"><FaTwitter /></a>
          <FooterLogo />
        </Social>
      </Right>
    </Wrapper>
  </Container>

export default Footer
