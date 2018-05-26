import styled, { css, keyframes } from 'styled-components'
import { up } from 'smooth-ui'

const animation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

const TwoColsMain = styled.main`
  flex: 1;

  ${up(
    'md',
    css`
      animation: 400ms ${animation} ease-out;
      animation-fill-mode: backwards;
    `,
  )};
`

export default TwoColsMain
