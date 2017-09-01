import styled from 'styled-components'
import theme from 'style/theme'

const MainTitle = styled.h1`
  font-size: 40px;
  line-height: 65px;
  font-weight: 300;
  margin: 10px 0;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 50px;
  }
`

export default MainTitle
