import styled from 'styled-components'
import theme from 'client/style/legacyTheme'

const Textarea = styled.textarea`
  border-radius: 3px;
  display: inline-block;
  padding: 5px 10px;
  font-size: 15px;
  line-height: 1.4;
  transition: border-color 200ms;
  border-width: 1px;
  border-style: solid;
  font-family: ${theme.fontFamilies.primary};
  border-color: ${props =>
    props.error ? theme.colors.danger : theme.colors.gray};
  color: ${theme.colors.grayDark};

  &:focus: {
    border-color: ${props =>
      props.error ? theme.colors.danger : theme.colors.grayDark};
    outline: 0;
  }
`

export default Textarea
