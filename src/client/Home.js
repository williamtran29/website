import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from 'modules/components/Button'
import Header from 'client/Header'

const Cover = styled.div`
  background-image: url('/images/home-cover.png');
  background-size: cover;
  height: 700px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 10px;
`

const Title = styled.h1`
  font-size: 50px;
  line-height: 1.2;
  margin: 10px 0;
  font-weight: bold;
  color: white;
`

const Subtitle = styled.p`
  font-size: 30px;
  font-weight: normal;
  line-height: 1.2;
  margin: 10px 0 80px;
  color: white;
`

const LinkButton = Button.withComponent(Link)

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
      <LinkButton to="/trainings">
        Consulter nos formations
      </LinkButton>
    </Cover>
  </div>
)
