import styled, { css } from 'styled-components'
import { upTo } from 'smooth-ui'

const MainSectionTitle = styled.h2`
  margin: 30px 0;
  font-weight: 300;
  font-size: 40px;
  line-height: 40px;

  ${upTo(
    'md',
    css`
      font-size: 40px;
      line-height: 50px;
    `,
  )};
`

export default MainSectionTitle
