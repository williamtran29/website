import styled from 'styled-components'
import theme from 'client/style/legacyTheme'

const Lead = styled.p`
  font-size: 28px;
  font-weight: 300;
  line-height: 38px;
  margin: 0;
  letter-spacing: 0.7px;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 30px;
  }
`

export default Lead
