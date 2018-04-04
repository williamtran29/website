import React from 'react'
import styled, { css } from 'styled-components'
import { upTo } from 'smooth-ui'
import { StickyContainer as BaseStickyContainer, Sticky } from 'react-sticky'

const StickyContainer = styled(BaseStickyContainer)`
  ${upTo(
    'md',
    css`
      height: 100%;
      overflow: hidden;
    `,
  )};

  ${({ theme }) => css`
    @media (max-width: ${theme.breakPoints.md}px) {
      div:first-child > div:first-child {
        padding-bottom: 0 !important;
      }
    }
  `};
`

const SidebarSticky = styled.div`
  ${({ theme }) => css`
    @media (max-width: ${theme.breakPoints.md}px) {
      ${'' /* display: flex;
      flex-direction: row;
      flex-wrap: wrap; */} position: relative !important;
      top: 0 !important;
      left: 0 !important;
    }
  `};
`

const TwoColsStickySidebar = ({ children }) => (
  <StickyContainer>
    <Sticky>
      {({ style }) => <SidebarSticky style={style}>{children}</SidebarSticky>}
    </Sticky>
  </StickyContainer>
)

export default TwoColsStickySidebar
