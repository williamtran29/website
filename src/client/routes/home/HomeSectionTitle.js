import styled from 'styled-components'
import theme from 'client/style/legacyTheme'

const HomeSectionTitle = styled.h3`
  font-weight: 300;
  font-size: 34px;
  line-height: 38px;
  margin: 0;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 42px;
    line-height: 46px;
  }

  @media (min-width: ${theme.medias.desktop}) {
    font-size: 50px;
    line-height: 60px;
  }
`

export default HomeSectionTitle
