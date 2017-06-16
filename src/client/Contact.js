import React from 'react'
import styled from 'styled-components'
import theme from 'style/theme'
import PageContainer from 'client/PageContainer'
import Header from 'client/Header'
import Footer from 'client/Footer'
import ContactForm from 'client/contact/ContactForm'
import MainTitle from 'modules/components/MainTitle'
import Lead from 'modules/components/Lead'

const Hero = styled.div`
  background-image: url(http://res.cloudinary.com/smooth/image/upload/f_auto,q_auto/v1497534886/typewriter-8019212_hiim90.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 300px;
  color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  text-align: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin: 20px auto;
  max-width: 1000px;
  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;
    margin: 50px auto;
  }
`

const FormContainer = styled.div`
  flex: 2;
`

const Infos = styled.div`
  flex: 1;
  padding: 40px;
`

const Label = styled.div`
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  margin-bottom: 10px;
`

const Info = styled.div`
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: 300;

  address {
    font-style: normal;
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
  }
`

const Contact = () =>
  <PageContainer>
    <Header />
    <Hero>
      <MainTitle>Contactez-nous</MainTitle>
      <Lead>L&apos;équipe Smooth Code est à votre service.</Lead>
    </Hero>
    <Container>
      <Infos>
        <Label>Adresse</Label>
        <Info>
          <address>41 rue Réaumur Sébastopol<br />75003 Paris</address>
        </Info>
        <Label>Téléphone</Label>
        <Info><a href="tel:0620106950">06 20 10 69 50</a></Info>
        <Label>Email</Label>
        <Info>
          <a href="mailto:contact@smooth-code.com">contact@smooth-code.com</a>
        </Info>
      </Infos>
      <FormContainer>
        <ContactForm />
      </FormContainer>
    </Container>
    <Footer />
  </PageContainer>

export default Contact
