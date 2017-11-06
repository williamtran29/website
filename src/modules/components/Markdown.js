import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { darken } from 'polished'
import theme from 'style/theme'

const Markdown = styled(ReactMarkdown)`
  font-size: 17px;
  line-height: 22px;
  letter-spacing: 0.2px;

  a {
    color: ${theme.colors.primary};

    &:hover {
      color: ${darken(0.3, theme.colors.primary)};
    }
  }

  p {
    margin: 20px 0;

    &:first-child {
      margin-top: 0;
    }
  }

  strong {
    font-weight: 400;
  }

  ul {
    margin: 20px 0;
    padding: 0 0 0 30px;
  }

  ul p {
    margin: 0;
  }

  li {
    position: relative;
    list-style-type: disc;
    padding: 0;
    font-size: 17px;
    line-height: 26px;
  }
`

export default Markdown
