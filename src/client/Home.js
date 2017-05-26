import React from 'react'
import glamorous from 'glamorous'
import { Link } from 'react-router-dom'
import Button from 'modules/components/Button'
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
  textAlign: 'center',
})

const Title = glamorous.h1({
  fontSize: 50,
  lineHeight: 1.2,
  margin: '10px 0',
  fontWeight: 'bold',
  color: 'white',
})

const Subtitle = glamorous.p({
  fontSize: 30,
  fontWeight: 'normal',
  lineHeight: 1.2,
  margin: '10px 0 80px',
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
      <Button component={Link} to="/trainings">
        Consulter nos formations
      </Button>
    </Cover>
  </div>
)
