import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from 'modules/components/Button'
import MainTitle from 'modules/components/MainTitle'
import Lead from 'modules/components/Lead'
import JsonLd from 'modules/components/JsonLd'
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

export default () => (
  <PageContainer>
    <Header transparent />
    <Cover>
      <CoverShadow />
      <MainTitle>Mentorat pour développeurs JavaScript</MainTitle>
      <Lead>Formez-vous sur les nouvelles librairies JS</Lead>
      <LinkButton to={trainingsRoute()} style={{ marginTop: 80 }}>
        Consulter nos formations
      </LinkButton>
    </Cover>
    <Technos />
    <Workshop />
    <Trainers />
    <Customers />
    <Footer />
    <JsonLd>
      {{
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        name: 'Smooth Code',
        description:
          'Formations JavaScript, React et Node.js pour les entreprises et les développeurs.',
        url: 'https://www.smooth-code.com',
        publisher: {
          '@type': 'Organization',
          name: 'Smooth Code',
          logo: {
            '@type': 'ImageObject',
            url:
              'https://res.cloudinary.com/smooth/image/upload/c_scale,w_473,h_60/v1503925180/bukcynjufd4tepjtpsgp.png',
            width: 473,
            height: 60,
          },
        },
        image: {
          '@type': 'ImageObject',
          url:
            'https://res.cloudinary.com/smooth/image/upload/estyol3xy8d9gpmviupd.png',
          width: 1440,
          height: 700,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://www.smooth-code.com/',
        },
      }}
    </JsonLd>
  </PageContainer>
)
