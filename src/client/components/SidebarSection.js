import styled, { css } from 'styled-components'
import { th, up } from 'smooth-ui'

const SidebarSection = styled.div`
  padding: 10px 20px 40px;

  ${up(
    'md',
    css`
      padding: 10px 10px 30px 30px;
      border-bottom: 1px solid ${th('gray200')};

      &:last-child {
        border-bottom: 0;
      }
    `,
  )};
`

export default SidebarSection
