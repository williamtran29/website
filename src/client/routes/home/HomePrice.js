import React from 'react'
import styled from 'styled-components'
import { cl } from 'shared/cloudinary'
import theme from 'client/style/legacyTheme'
import HomeSectionTitle from './HomeSectionTitle'
import HomeContainer from './HomeContainer'

const Container = HomeContainer.extend`
  background-color: #333;
  background-image: url(${cl('bg-price_nukmi1')});
  background-size: cover;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;
  }
`

const Block = styled.div`
  background: #fff;
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 20px 20px 30px;
  max-width: 410px;
`

const BlockTitle = styled.div`
  font-weight: 700;
  font-size: 22px;
  line-height: 24px;
  margin-bottom: 10px;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 24px;
    line-height: 28px;
  }
`

const BlockText = styled.div`
  font-size: 16px;
  line-height: 20px;
  text-align: justify;

  p:not(:last-child) {
    margin-bottom: 20px;
  }
`

const Text = styled.div`
  margin-top: 50px;
  max-width: 500px;
  color: #fff;

  @media (min-width: ${theme.medias.phablet}) {
    margin-left: 70px;
    margin-top: 0;
  }
`

const Lead = styled.div`
  font-size: 18px;
  line-height: 22px;
  margin-top: 20px;

  p {
    margin: 0 0 26px;
  }

  @media (min-width: ${theme.medias.phablet}) {
    margin-top: 40px;
    font-size: 22px;
    line-height: 26px;
  }
`

const HomePrice = () => (
  <Container>
    <Wrapper>
      <div>
        <Block>
          <BlockTitle>
            Se former c’est avant tout faire des économies&nbsp;!
          </BlockTitle>
          <BlockText>
            <p>
              Une journée de formation Smooth Code équivaut à 7 jours
              d’auto-formation. Partons du postulat que vous rapportez 500€ par
              jour à votre société. La formation React Fondamental d’une journée
              vous fait gagner 6 jours, soit 3000€.
            </p>
            <p>
              Ajoutons à ça le gain en productivité : augmenter votre efficacité
              ne serait-ce que de 1% vous permet de gagner 2 jours par an, soit
              2800€ sur les deux ans à venir&nbsp;!
            </p>
          </BlockText>
        </Block>
      </div>
      <Text>
        <HomeSectionTitle>Combien ça coûte ?</HomeSectionTitle>
        <Lead>
          <p>
            Nous sommes certifiés DataDock, ce qui signifie que votre formation
            peut être financée à 100% par votre OPCA.
          </p>
          <p>
            Pour en bénéficier, rien de plus facile&nbsp;!<br />
            Dès l’inscription, vous recevrez une convention de formation à
            transmettre à votre OPCA. Une fois validée, on s’occupe du reste !
            Vous n’avez plus qu’à profiter de votre Workshop.
          </p>
        </Lead>
      </Text>
    </Wrapper>
  </Container>
)

export default HomePrice
