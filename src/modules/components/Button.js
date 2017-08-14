import { omitProps } from 'recompact'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { darken } from 'polished'
import theme from 'style/theme'

const Button = styled.button`
  border-radius: 3px;
  display: ${props => (props.block ? 'block' : 'inline-block')};
  padding: 8px 30px;
  text-align: center;
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  white-space: nowrap;
  color: white;
  cursor: pointer;
  transition: background-color 200ms;
  text-decoration: none;
  border: 0;
  background-color: ${theme.colors.primary};

  &:hover,
  &:focus {
    background-color: ${darken(0.2, theme.colors.primary)};
    outline: none;
    text-decoration: none;
  }
`

export const LinkButton = Button.withComponent(omitProps('block')(Link))

export default Button
