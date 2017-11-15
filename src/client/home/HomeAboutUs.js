import React from 'react'
import styled from 'styled-components'
import theme from 'style/theme'
import { clUrl } from 'modules/cloudinary'
import FaGitHub from 'react-icons/lib/fa/github'
import FaTwitter from 'react-icons/lib/fa/twitter'
import FaLinkedin from 'react-icons/lib/fa/linkedin'
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

const FounderHeader = styled.div`
  display: flex;
  flex-direction: row;
`

const FounderName = styled.div`
  font-weight: 300;
  font-size: 30px;
  line-height: 40px;
`

const FounderDescription = styled.p`
  margin: 10px 0 0;
  font-size: 16px;
  color: #555;
  line-height: 20px;
  text-align: justify;
`

const Social = styled.div`
  display: flex;
  align-items: center;
  font-size: 28px;
  justify-content: flex-start;
  height: 35px;

  a {
    margin-left: 8px;
  }
`

const HomePrice = () => (
  <Container>
    <HomeWrapper>
      <HomeSectionTitle>Un mot sur les fondateurs</HomeSectionTitle>
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
            <FounderHeader>
              <FounderName>Greg Bergé</FounderName>
              <Social>
                <a
                  href="https://github.com/neoziro"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGitHub />
                </a>
                <a
                  href="https://twitter.com/neoziro"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter />
                </a>
              </Social>
            </FounderHeader>
            <FounderDescription>
              Greg est développeur JavaScript depuis le début des années 2000 et
              auteur de plusieurs librairies open-source à succès comme Shipit,
              React Hot Loader ou SVGR. Formateur à l’international, c’est
              l’expert JavaScript de Smooth Code.
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
            <FounderHeader>
              <FounderName>Jeremy Sfez</FounderName>
              <Social>
                <a
                  href="https://fr.linkedin.com/in/jeremysfez"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://twitter.com/SfezJeremy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter />
                </a>
              </Social>
            </FounderHeader>
            <FounderDescription>
              Jeremy est un ancien de l’équipe fondatrice de Doctolib,
              développeur et formateur JavaScript. Il est organisateur du Meetup
              GraphQL Paris et auteur de nombreux articles sur l’actualité tech.
            </FounderDescription>
          </FounderText>
        </Founder>
      </Founders>
    </HomeWrapper>
  </Container>
)

export default HomePrice
