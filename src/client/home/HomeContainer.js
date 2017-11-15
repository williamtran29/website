import styled from 'styled-components'
import theme from 'style/theme'

const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 20px 60px;

  @media (min-width: ${theme.medias.phablet}) {
    padding: 60px 20px 80px;
  }
`

export default HomeWrapper
