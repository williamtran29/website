import styled from 'styled-components'
import theme from 'style/theme'

const Lead = styled.p`
  font-size: 28px;
  font-weight: 300;
  line-height: 1.2;
  margin: 0;
  letter-spacing: 0.05em;
  @media (min-width: ${theme.medias.phablet}) {
    font-size: 30px;
  }
`

export default Lead
