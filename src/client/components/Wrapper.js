import styled from 'styled-components'
import { th } from 'smooth-ui'

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${th('wrapperWidth')};
  padding-left: 10px;
  padding-right: 10px;

  @media (min-width: ${th('wrapperWidth')}) {
    padding-left: 0;
    padding-right: 0;
  }
`

export default Wrapper
