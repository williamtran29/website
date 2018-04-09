import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet-async'
import MainTitle from 'client/components/MainTitle'
import Lead from 'client/components/Lead'
import LinkButton from 'client/components/LinkButton'
import PageContainer from 'client/components/PageContainer'
import Header from 'client/components/Header'
import Footer from 'client/components/Footer'
import { homeRoute } from 'shared/routePaths'

const Container = styled.div`
  flex: 1;
  margin: 20px auto;
  max-width: 1000px;
  width: 100%;
  text-align: center;
`

const LinkContainer = styled.div`
  margin: 50px 0;
`

const Contact = () => (
  <PageContainer>
    <Helmet>
      <title>Page introuvable</title>
    </Helmet>
    <Header />
    <Container>
      <MainTitle>Page introuvable</MainTitle>
      <Lead>Vous vous êtes égarés, pas de panique !</Lead>
      <LinkContainer>
        <LinkButton to={homeRoute()}>Consultez nos formations</LinkButton>
      </LinkContainer>
    </Container>
    <Footer />
  </PageContainer>
)

export default Contact
