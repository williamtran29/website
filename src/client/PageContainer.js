import React from 'react'
import styled from 'styled-components'

const InnerPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: stretch;
  min-height: 100%;
  position: relative;
`

const PageContainer = ({ children }) => (
  <InnerPageContainer>{children}</InnerPageContainer>
)

export default PageContainer
