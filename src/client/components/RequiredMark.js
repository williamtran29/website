import styled from 'styled-components'
import { th } from 'smooth-ui'

const RequiredMark = styled.span`
  color: ${th('danger')};

  &::before {
    content: '*';
  }
`

export default RequiredMark
