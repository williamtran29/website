import React from 'react'
import styled from 'styled-components'
import theme from 'style/theme'
import { clUrl } from 'modules/cloudinary'
import HomeSectionTitle from './HomeSectionTitle'
import HomeWrapper from './HomeWrapper'
import HomeContainer from './HomeContainer'

const Container = HomeContainer.extend`
  background-color: #fff;
  text-align: center;
`

const Founders = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  text-align: left;
`

const Founder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;

  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;
    align-items: flex-start;
    margin: 40px 60px 0 0;
  }
`

const FounderPicture = styled.img`
  flex-shrink: 0;
  border-radius: 50%;
  width: 140px;
  height: 140px;
  margin-bottom: 10px;

  @media (min-width: ${theme.medias.phablet}) {
    margin-right: 10px;
  }
`

const FounderText = styled.div`
  max-width: 350px;
`

const FounderName = styled.div`
  font-weight: 300;
  font-size: 30px;
  line-height: 40px;
`

const FounderTitle = styled.div`
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;
`

const FounderDescription = styled.p`
  margin: 10px 0 0;
  font-size: 16px;
  color: #555;
  line-height: 20px;
  text-align: justify;
`

const HomePrice = () => (
  <Container>
    <HomeWrapper>
      <HomeSectionTitle>Qui sommes-nous&nbsp;?</HomeSectionTitle>
      <Founders>
        <Founder>
          <FounderPicture
            src={clUrl(
              'profile-3_yfghdn',
              'c_fill,g_face,h_140,w_140,dpr_2,e_grayscale',
            )}
            alt="Greg Bergé"
          />
          <FounderText>
            <FounderName>Greg Bergé</FounderName>
            <FounderTitle>Co-fondateur et Président</FounderTitle>
            <FounderDescription>
              Développeur JavaScript depuis maintenant plus de 15 ans, Greg est
              le formateur expert de Smooth Code. Il est auteur de plusieurs
              librairies open-source à succès comme Shipit, React Hot Loader ou
              SVGR.
            </FounderDescription>
          </FounderText>
        </Founder>
        <Founder>
          <FounderPicture
            src={clUrl(
              'profile_jeremy_vdqdbb',
              'c_fill,g_face,h_140,w_140,dpr_2,e_grayscale',
            )}
            alt="Jeremy Sfez"
          />
          <FounderText>
            <FounderName>Jeremy Sfez</FounderName>
            <FounderTitle>Co-fondateur et Directeur Général</FounderTitle>
            <FounderDescription>
              Ancien de l’équipe fondatrice de Doctolib, Jeremy est le directeur
              commercial de Smooth Code. Il est organisateur du Meetup GraphQL
              et auteur de nombreux articles sur JavaScript et son écosystème.
            </FounderDescription>
          </FounderText>
        </Founder>
      </Founders>
    </HomeWrapper>
  </Container>
)

export default HomePrice
