import styled from 'styled-components'
import theme from 'client/style/legacyTheme'

const SecondaryTitle = styled.h2`
  font-size: 26px;
  line-height: 1.4;
  font-weight: 300;
  margin: 10px 0;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 40px;
  }
`

export default SecondaryTitle
