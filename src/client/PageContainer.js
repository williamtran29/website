import React from 'react'
import styled from 'styled-components'
import { BlackFridayBanner } from './BlackFriday'

const InnerPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: stretch;
`

const OuterPageContainer = styled.div`
  min-height: 100%;
  position: relative;
`

const PageContainer = ({ children }) => (
  <OuterPageContainer>
    <BlackFridayBanner />
    <InnerPageContainer>{children}</InnerPageContainer>
  </OuterPageContainer>
)

export default PageContainer
