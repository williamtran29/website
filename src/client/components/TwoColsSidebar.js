import styled, { keyframes, css } from 'styled-components'
import { th, upTo } from 'smooth-ui'

const animation = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
`

const TwoColsSidebar = styled.aside`
  ${upTo(
    'md',
    css`
      animation: 400ms ${animation} ease-out;
      animation-fill-mode: backwards;
      width: 290px;
      border-left: 1px solid ${th('gray200')};
    `,
  )};
`

export default TwoColsSidebar
