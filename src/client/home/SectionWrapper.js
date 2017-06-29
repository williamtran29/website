import styled from 'styled-components'
import theme from 'style/theme'

const SectionWrapper = styled.div`
  display: flex;
  max-width: ${theme.medias.xl};
  margin: 70px auto;

  @media (min-width: ${theme.medias.phablet}) {
    margin: 100px auto;
  }
`

export default SectionWrapper
