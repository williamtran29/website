import styled from 'styled-components'
import { darken, lighten } from 'polished'
import theme from 'style/theme'

const Alert = styled.div`
  padding: 10px;
  border-radius: 4px;
  background-color: ${props => lighten(0.3, theme.colors[props.ui])};
  color: ${props => darken(0.2, theme.colors[props.ui])};
`

Alert.defaultProps = {
  ui: 'danger',
}

export default Alert
