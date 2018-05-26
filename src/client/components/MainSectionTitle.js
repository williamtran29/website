import styled, { css } from 'styled-components'
import { up } from 'smooth-ui'

const MainSectionTitle = styled.h2`
  margin: 30px 0;
  font-weight: 300;
  font-size: 40px;
  line-height: 40px;

  ${up(
    'md',
    css`
      font-size: 40px;
      line-height: 50px;
    `,
  )};
`

export default MainSectionTitle
