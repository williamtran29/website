import React from 'react'
import styled, { css } from 'styled-components'
import { up, down } from 'smooth-ui'
import { StickyContainer as BaseStickyContainer, Sticky } from 'react-sticky'

const StickyContainer = styled(BaseStickyContainer)`
  ${up(
    'md',
    css`
      height: 100%;
      overflow: hidden;
    `,
  )};

  ${down(
    'md',
    css`
      div:first-child > div:first-child {
        padding-bottom: 0 !important;
      }
    `,
  )};
`

const SidebarSticky = styled.div`
  ${down(
    'md',
    css`
      position: relative !important;
      top: 0 !important;
      left: 0 !important;
    `,
  )};
`

const TwoColsStickySidebar = ({ children }) => (
  <StickyContainer>
    <Sticky>
      {({ style }) => <SidebarSticky style={style}>{children}</SidebarSticky>}
    </Sticky>
  </StickyContainer>
)

export default TwoColsStickySidebar
