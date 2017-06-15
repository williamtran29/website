import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from 'modules/components/Button'
import H1 from 'modules/components/H1'
import Header from 'client/Header'
import Technos from 'client/home/Technos'
import Workshop from 'client/home/Workshop'
import Trainers from 'client/home/Trainers'

const Cover = styled.div`
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
`
const Subtitle = styled.p`
  font-size: 28px;
  font-weight: normal;
  line-height: 1.2;
  margin: 10px 0 80px;
  @media (min-width: 700px) {
    font-size: 30px;
  }
`

const LinkButton = Button.withComponent(Link)

export default () =>
  <div>
    <Header transparent />
    <Cover>
      <H1>
        Notre savoir-faire à votre service.
      </H1>
      <Subtitle>
        Des formations par les développeurs pour les développeurs.
      </Subtitle>
      <LinkButton to="/trainings">
        Consulter nos formations
      </LinkButton>
    </Cover>
    <Technos />
    <Workshop />
    <Trainers />
  </div>
