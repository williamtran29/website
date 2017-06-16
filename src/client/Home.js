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

const Cover = styled.div`
  position: relative;
  background-color: #140E09;
  background-image: url(http://res.cloudinary.com/smooth/image/upload/f_auto,q_auto/v1497509180/home-cover_pqehlq);
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

  h1, p {
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

const LinkButton = Button.extend`
  margin-top: 80px;
`.withComponent(Link)

export default () =>
  <PageContainer>
    <Header transparent />
    <Cover>
      <CoverShadow />
      <MainTitle>
        Notre savoir-faire à votre service.
      </MainTitle>
      <Lead>
        Des formations par les développeurs pour les développeurs.
      </Lead>
      <LinkButton to="/trainings">
        Consulter nos formations
      </LinkButton>
    </Cover>
    <Technos />
    <Workshop />
    <Trainers />
    <Customers />
    <Footer />
  </PageContainer>
