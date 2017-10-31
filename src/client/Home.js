import React from 'react'
import JsonLd from 'modules/components/JsonLd'
import PageContainer from 'client/PageContainer'
import Header from 'client/Header'
import Footer from 'client/Footer'
import HomeCover from 'client/home/HomeCover'
import HomeClients from 'client/home/HomeClients'
import HomeWorkshops from 'client/home/HomeWorkshops'
import HomePrivate from 'client/home/HomePrivate'
import HomePrice from 'client/home/HomePrice'
import HomeAboutUs from 'client/home/HomeAboutUs'

const Home = () => (
  <PageContainer>
    <Header transparent />
    <HomeCover />
    <HomeClients />
    <HomeWorkshops />
    <HomePrivate />
    <HomePrice />
    <HomeAboutUs />
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

export default Home
