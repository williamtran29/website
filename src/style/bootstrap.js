import { injectGlobal } from 'styled-components'
import theme from 'style/theme'

/* eslint-disable no-unused-expressions */
injectGlobal`
  html, body {
    margin: 0;
    font-family: ${theme.fontFamilies.primary};
    color: ${theme.colors.grayDark};
  }

  * {
    box-sizing: border-box;
  }
`
/* eslint-enable no-unused-expressions */
