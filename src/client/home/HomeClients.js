import React from 'react'
import styled from 'styled-components'
import { clUrl } from 'modules/cloudinary'
import theme from 'style/theme'
import HomeWrapper from './HomeWrapper'

const Wrapper = HomeWrapper.extend`
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  width: 100%;

  @media (min-width: ${theme.medias.phablet}) {
    min-height: 70px;
  }
`

const Picture = styled.img`
  margin: 10px;
  max-height: 24px;

  &:last-child {
    display: none;
  }

  @media (min-width: ${theme.medias.phablet}) {
    margin: 0;
    max-height: none;

    &:last-child {
      display: block;
    }
  }
`

const HomeClients = () => (
  <Wrapper>
    <Picture src={clUrl('Doctolib_meresa')} height={41} alt="Doctolib" />
    <Picture src={clUrl('Le_Monde_utfsk9')} height={36} alt="Le Monde" />
    <Picture
      src={clUrl('Docapost_s4wmx1')}
      height={20}
      alt="Docapost Agility"
    />
  </Wrapper>
)

export default HomeClients
