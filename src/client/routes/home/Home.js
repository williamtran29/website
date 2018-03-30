import React from 'react'
import JsonLd from 'client/components/JsonLd'
import PageContainer from 'client/components/PageContainer'
import Header from 'client/components/Header'
import Footer from 'client/components/Footer'
import HomeCover from './HomeCover'
import HomeClients from './HomeClients'
import HomeWorkshops from './HomeWorkshops'
import HomePrivate from './HomePrivate'
import HomePrice from './HomePrice'
import HomeAboutUs from './HomeAboutUs'
import HomeTrainingPicture from './HomeTrainingPicture'

const Home = () => (
  <PageContainer>
    <Header transparent />
    <HomeCover />
    <HomeClients />
    <HomeWorkshops />
    <HomePrivate />
    <HomePrice />
    <HomeTrainingPicture />
    <HomeAboutUs />
    <Footer />
    <JsonLd>
      {{
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        name: 'Smooth Code',
        description:
          'Formations JavaScript, React et GraphQL pour les entreprises et les développeurs.',
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

export default Home
