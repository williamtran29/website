import styled, { css } from 'styled-components'
import { th, upTo } from 'smooth-ui'

const TwoColsContainer = styled.div`
  flex: 1;
  margin: 0 auto;
  max-width: ${th('wrapperWidth')};
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  min-height: 500px;

  ${upTo(
    'md',
    css`
      flex-direction: row;
    `,
  )};
`

export default TwoColsContainer
