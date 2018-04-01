import styled from 'styled-components'
import theme from 'client/style/legacyTheme'

const MainTitle = styled.h1`
  font-size: 40px;
  line-height: 50px;
  font-weight: 300;
  margin: 10px 0;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 50px;
    line-height: 65px;
  }
`

export default MainTitle
