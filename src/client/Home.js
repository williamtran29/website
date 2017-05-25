import React from 'react'
import glamorous from 'glamorous'
import Header from 'client/Header'

const Cover = glamorous.div({
  backgroundImage: "url('/images/home-cover.png')",
  backgroundSize: 'cover',
  height: 700,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})

const Title = glamorous.h1({
  fontSize: 50,
  lineHeight: 1.2,
  margin: '20px 0',
  fontWeight: 'bold',
  color: 'white',
})

const Subtitle = glamorous.p({
  fontSize: 30,
  fontWeight: 'normal',
  lineHeight: 1.2,
  margin: 0,
  color: 'white',
})

export default () => (
  <div>
    <Header transparent />
    <Cover>
      <Title>
        Notre savoir-faire à votre service.
      </Title>
      <Subtitle>
        Des formations par les développeurs pour les développeurs.
      </Subtitle>
    </Cover>
  </div>
)
