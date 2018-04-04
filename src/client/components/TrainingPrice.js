import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'

const Description = styled.div`
  font-weight: 300;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 10px;
  text-align: center;
`

const Price = styled.div`
  font-size: 40px;
  line-height: 50px;
  text-align: center;
  font-weight: 700;
`

const TrainingPriceComponent = ({ training, ...props }) => (
  <div {...props}>
    <Description>Prix par personne</Description>
    <Price>{training.price}€</Price>
  </div>
)

const TrainingPrice = styled(TrainingPriceComponent)`
  margin-top: 20px;
`

export const trainingPriceFragment = gql`
  fragment TrainingPrice on Training {
    price
  }
`

export default TrainingPrice
