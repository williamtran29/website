import styled from 'styled-components'
import { Link as ReactRouterLink } from 'react-router-dom'
import { darken } from 'polished'
import theme from 'style/theme'

const Link = styled.a`
  transition: color 200ms;
  will-change: color;
  color: ${theme.colors.primary};

  &:hover {
    color: ${darken(0.1, theme.colors.primary)};
  }

  &:active {
    color: ${darken(0.2, theme.colors.primary)};
  }
`

export const RouterLink = Link.withComponent(ReactRouterLink)

export default Link
