import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import MainTitle from 'modules/components/MainTitle'
import Lead from 'modules/components/Lead'
import { LinkButton } from 'modules/components/Button'
import PageContainer from 'client/PageContainer'
import Header from 'client/Header'
import Footer from 'client/Footer'
import { homeRoute } from 'modules/routePaths'

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
