import { injectGlobal } from 'styled-components'
import theme from 'client/style/legacyTheme'

export const injectGlobalStyle = () => injectGlobal`
  html, body {
    margin: 0;
    font-family: ${theme.fontFamilies.primary};
    color: ${theme.colors.grayDark};
    height: 100%;
    -webkit-font-smoothing: antialiased;
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
    color: inherit;

    &:hover {
      text-decoration: none;
    }
  }
`
