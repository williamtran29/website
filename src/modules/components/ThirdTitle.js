import styled from 'styled-components'
import theme from 'style/theme'

const ThirdTitle = styled.h3`
  font-weight: 300;
  font-size: 20px;
  line-height: 1.2;
  margin: 10px 0;

  @media (min-width: ${theme.medias.phablet}) {
    font-size: 24px;
  }
`

export default ThirdTitle
