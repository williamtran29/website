import React from 'react'
import styled from 'styled-components'
import theme from 'client/style/legacyTheme'
import { cl } from 'shared/cloudinary'
import BaseLinkButton from 'client/components/BaseLinkButton'
import HomeSectionTitle from './HomeSectionTitle'
import HomeContainer from './HomeContainer'

const Container = HomeContainer.extend`
  background-color: #fff;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;
  }
`

const Picture = styled.img`
  margin-bottom: 20px;
  flex-shrink: 0;
  max-width: 310px;
  max-height: 310px;
  width: 100%;

  @media (min-width: ${theme.medias.phablet}) {
    margin-right: 100px;
  }
`

const Text = styled.div`
  max-width: 500px;
`

const Lead = styled.div`
  font-size: 18px;
  line-height: 22px;
  margin-top: 20px;

  p {
    margin: 0 0 20px;
  }

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 22px;
    line-height: 26px;
    margin-top: 40px;
  }
`

const HomePrivate = () => (
  <Container>
    <Wrapper>
      <Picture src={cl('technos-pack_w1h9c6')} alt="Librairies JavaScript" />
      <Text>
        <HomeSectionTitle dark>Formation sur mesure</HomeSectionTitle>
        <Lead>
          <p>
            Nous proposons des formations privées sur RxJS, Webpack, React
            Native ou Node.js.
          </p>
          <p>
            Besoin d’être rassuré sur vos choix d’architecture ? Nous réalisons
            des audits techniques de votre stack.
          </p>
          <p>
            Contactez-nous pour trouvez la formule la plus adaptée à votre
            situation.
          </p>
        </Lead>
        <BaseLinkButton href="mailto:contact@smooth-code.com?subject=Demande%20de%20devis&body=Bonjour%20je%20suis%20intéressé%20par...">
          Obtenir un devis sur mesure
        </BaseLinkButton>
      </Text>
    </Wrapper>
  </Container>
)

export default HomePrivate
