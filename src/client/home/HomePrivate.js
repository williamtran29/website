import React from 'react'
import styled from 'styled-components'
import theme from 'style/theme'
import { clUrl } from 'modules/cloudinary'
import { BaseLinkButton } from 'modules/components/Button'
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
      <Picture src={clUrl('technos-pack_w1h9c6')} alt="Librairies JavaScript" />
      <Text>
        <HomeSectionTitle dark>Formation sur mesure</HomeSectionTitle>
        <Lead>
          <p>
            Vous désirez vous former sur autre technologie&nbsp;?<br />Le format
            Workshop ne vous convient pas&nbsp;?
          </p>
          <p>
            <strong>La formation JavaScript est notre spécialité&nbsp;!</strong>
            <br />
            Nous formons sur React Native, Webpack, Node.js, RxJS et même
            Git&nbsp;!
          </p>
        </Lead>
        <BaseLinkButton href="mailto:contact@smooth-code.com">
          Demander un devis
        </BaseLinkButton>
      </Text>
    </Wrapper>
  </Container>
)

export default HomePrivate
