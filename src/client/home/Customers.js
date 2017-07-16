import React from 'react'
import styled from 'styled-components'
import theme from 'style/theme'
import { clUrl } from 'modules/cloudinary'
import MainTitle from 'modules/components/MainTitle'
import SectionWrapper from 'client/home/SectionWrapper'
import LazyLoad from 'react-lazyload'

const Container = styled.div`text-align: center;`

const Wrapper = SectionWrapper.extend`flex-direction: column;`

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
  height: 60px;

  img {
    filter: grayscale(1);
    max-width: 100%;
    max-height: 60px;
  }

  @media (min-width: ${theme.medias.phablet}) {
    margin: 0 30px;
  }
`

const Title = MainTitle.withComponent('h2')

const Customers = () =>
  <Container>
    <Wrapper flexDirection="column">
      <Title>Ils nous font confiance</Title>
      <Pictures>
        <Picture>
          <LazyLoad height={60} once offset={100}>
            <img
              alt="Le Monde.fr"
              src={clUrl('lemonde_oea6fk', 'c_scale,h_60,dpr_2')}
              height="60"
            />
          </LazyLoad>
        </Picture>
        <Picture>
          <LazyLoad height={60} once offset={100}>
            <img
              alt="Doctolib"
              src={clUrl('doctolib_uzkmp9', 'c_scale,h_60,dpr_2')}
              height="60"
            />
          </LazyLoad>
        </Picture>
        <Picture>
          <LazyLoad height={60} once offset={100}>
            <img
              alt="Institut de Formation à l'Administration Publique"
              src={clUrl('ifap_kxpz6c', 'c_scale,h_60,dpr_2')}
              height="60"
            />
          </LazyLoad>
        </Picture>
      </Pictures>
    </Wrapper>
  </Container>

export default Customers
