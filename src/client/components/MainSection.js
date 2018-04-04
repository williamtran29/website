import styled, { css } from 'styled-components'
import { th, upTo } from 'smooth-ui'

const MainSection = styled.section`
  border-bottom: 1px solid ${th('gray200')};
  margin: 0 20px;

  &:last-child {
    border-bottom: 0;
    padding-bottom: 50px;
  }

  ${upTo(
    'md',
    css`
      margin: 0 50px 0 10px;
    `,
  )};
`

export default MainSection
