import styled from 'styled-components'
import theme from 'style/theme'

const Input = styled.input`
  border-radius: 3px;
  display: inline-block;;
  height: 38px;
  padding: 0 10px;
  font-size: 15px;
  line-height: 38px;
  transition: border-color 200ms;
  border-width: 1px;
  border-style: solid;
  font-family: ${theme.fontFamilies.primary};
  border-color: ${props => (props.error ? theme.colors.danger : theme.colors.gray)};
  color: ${theme.colors.grayDark};
  &:focus {
    border-color: ${props => (props.error ? theme.colors.danger : theme.colors.grayDark)};
    outline: 0;
  }
`

export default Input
