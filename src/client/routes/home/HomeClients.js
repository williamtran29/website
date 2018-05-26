import React from 'react'
import styled from 'styled-components'
import { cl } from 'shared/cloudinary'
import theme from 'client/style/legacyTheme'
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

  &:nth-last-child(1),
  &:nth-last-child(4) {
    display: none;
  }

  @media (min-width: ${theme.medias.phablet}) {
    margin: 0;
    max-height: none;

    &:nth-last-child(1) {
      display: block;
    }
  }

  @media (min-width: ${theme.medias.desktop}) {
    &:nth-last-child(4) {
      display: block;
    }
  }
`

const HomeClients = () => (
  <Wrapper>
    <Picture src={cl('Doctolib_meresa')} height={41} alt="Doctolib" />
    <Picture src={cl('Le_Monde_utfsk9')} height={36} alt="Le Monde" />
    <Picture src={cl('Docapost_s4wmx1')} height={20} alt="Docapost Agility" />
    <Picture src={cl('logo_BAP')} height={41} alt="Bureau à Partager" />
  </Wrapper>
)

export default HomeClients
