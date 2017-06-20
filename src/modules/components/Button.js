import styled from 'styled-components'
import { darken } from 'polished'
import theme from 'style/theme'

const Button = styled.button`
  border-radius: 3px;
  display: inline-block;
  height: 38px;
  padding: 0 30px;
  text-align: center;
  font-size: 16px;
  line-height: 38px;
  white-space: nowrap;;
  color: white;
  cursor: pointer;
  transition: background-color 200ms;
  text-decoration: none;
  border: 0;
  background-color: ${theme.colors.primary};
  &:hover, &:focus {
    background-color: ${darken(0.2, theme.colors.primary)};
    outline: none;
  }
`

export default Button
