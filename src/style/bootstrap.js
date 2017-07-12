import { injectGlobal } from 'styled-components'
import theme from 'style/theme'

/* eslint-disable no-unused-expressions */
injectGlobal`
  html, body {
    margin: 0;
    font-family: ${theme.fontFamilies.primary};
    color: ${theme.colors.grayDark};
    height: 100%;
  }

  #main {
    height: 100%;

    > div {
      height: 100%;
    }
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: ${theme.colors.primary};

    &:hover {
      text-decoration: underline;
    }
  }
`
/* eslint-enable no-unused-expressions */
