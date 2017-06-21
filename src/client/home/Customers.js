import React from 'react'
import styled from 'styled-components'
import theme from 'style/theme'
import MainTitle from 'modules/components/MainTitle'
import SectionWrapper from 'client/home/SectionWrapper'

const Container = styled.div`
  text-align: center;
`

const Wrapper = SectionWrapper.extend`
  flex-direction: column;
`

const Pictures = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: ${theme.medias.phablet}) {
    margin-top: 50px;
    flex-direction: row;
  }
`

const Picture = styled.div`
  flex: 1;
  margin: 20px;

  img {
    filter: grayscale(1);
    max-width: 100%;
    max-height: 60px;
  }

  @media (min-width: ${theme.medias.phablet}) {
    margin: 0 30px;

    img {
      max-height: 100px;
    }
  }
`

const Title = MainTitle.withComponent('h2')

const Customers = () =>
  <Container>
    <Wrapper flexDirection="column">
      <Title>Ils nous ont fait confiance</Title>
      <Pictures>
        <Picture>
          <img
            alt="Le Monde.fr"
            src="//res.cloudinary.com/smooth/image/upload/v1497521162/lemonde_oea6fk"
          />
        </Picture>
        <Picture>
          <img
            alt="Doctolib"
            src="//res.cloudinary.com/smooth/image/upload/v1497521159/doctolib_uzkmp9.png"
          />
        </Picture>
        <Picture>
          <img
            alt="Institut de Formation à l'Administration Publique"
            src="//res.cloudinary.com/smooth/image/upload/v1497521157/ifap_kxpz6c.png"
          />
        </Picture>
      </Pictures>
    </Wrapper>
  </Container>

export default Customers
