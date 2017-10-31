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
  min-height: 70px;
  width: 100%;
`

const Picture = styled.img`
  margin: 10px;

  @media (min-width: ${theme.medias.phablet}) {
    margin: 0;
  }
`

const HomeClients = () => (
  <Wrapper>
    <Picture
      src={clUrl('Doctolib_meresa')}
      width={140}
      height={41}
      alt="Doctolib"
    />
    <Picture
      src={clUrl('Le_Monde_utfsk9')}
      width={169}
      height={36}
      alt="Le Monde"
    />
    <Picture
      src={clUrl('Docapost_s4wmx1')}
      width={180}
      height={20}
      alt="Docapost Agility"
    />
  </Wrapper>
)

export default HomeClients
