import omitProps from 'recompact/omitProps'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { darken } from 'polished'
import theme from 'style/theme'

const Button = styled.button`
  border-radius: 3px;
  display: ${props => (props.block ? 'block' : 'inline-block')};
  width: ${props => (props.block ? '100%' : 'auto')};
  padding: ${props => (props.small ? '3px 30px' : '8px 30px')};
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  white-space: nowrap;
  color: #fff;
  cursor: pointer;
  transition: background-color 200ms;
  text-decoration: none;
  text-transform: uppercase;
  border: 0;
  background-color: ${theme.colors.primary};

  &:hover,
  &:focus {
    background-color: ${darken(0.2, theme.colors.primary)};
    outline: none;
    text-decoration: none;
  }

  @media print {
    display: none;
  }
`

export const LinkButton = Button.withComponent(
  omitProps(['block', 'small'])(Link),
)
export const ScrollLinkButton = Button.withComponent(
  omitProps(['block', 'small'])(ScrollLink),
)
export const BaseLinkButton = Button.withComponent('a')

export default Button
