import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from 'modules/components/Button'
import MainTitle from 'modules/components/MainTitle'
import Lead from 'modules/components/Lead'
import PageContainer from 'client/PageContainer'
import Header from 'client/Header'
import Footer from 'client/Footer'
import Customers from 'client/home/Customers'
import Technos from 'client/home/Technos'
import Trainers from 'client/home/Trainers'
import Workshop from 'client/home/Workshop'
import { clUrl } from 'modules/cloudinary'
import { trainingsRoute } from 'modules/routePaths'

const Cover = styled.div`
  position: relative;
  background-color: #261d16;
  background-image: url("${clUrl('home-cover_pqehlq')}");
  background-size: cover;
  height: 600px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 10px;
  color: white;

  h1,
  p {
    z-index: 2;
  }
`

const CoverShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background-image: linear-gradient(0, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
  z-index: 0;
`

const LinkButton = Button.withComponent(Link)

export default () =>
  <PageContainer>
    <Header transparent />
    <Cover>
      <CoverShadow />
      <MainTitle>Notre savoir-faire à votre service.</MainTitle>
      <Lead>Des formations par des développeurs pour des développeurs.</Lead>
      <LinkButton to={trainingsRoute()} style={{ marginTop: 80 }}>
        Consulter nos formations
      </LinkButton>
    </Cover>
    <Technos />
    <Workshop />
    <Trainers />
    <Customers />
    <Footer />
  </PageContainer>
