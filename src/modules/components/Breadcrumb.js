import React from 'react'
import styled from 'styled-components'
import { RouterLink } from 'modules/components/Link'
import JsonLd from 'modules/components/JsonLd'
import { breadcrumbLd } from 'client/linkedData'
import { completeUrl } from 'modules/urlUtil'
import theme from 'style/theme'

const Container = styled.div`
  font-size: 20px;
  line-height: 24px;
  font-weight: 300;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid ${theme.colors.grayLight};
`

const Breadcrumb = ({ links }) =>
  <Container>
    {links.reduce((elements, link, index) => {
      if (index !== links.length - 1) {
        elements.push(
          <RouterLink key={link.url} to={link.url}>
            {link.name}
          </RouterLink>,
        )
        elements.push(' > ')
      } else {
        elements.push(link.name)
      }

      return elements
    }, [])}
    <JsonLd>
      {breadcrumbLd({
        links: links.map(link => ({ ...link, url: completeUrl(link.url) })),
      })}
    </JsonLd>
  </Container>

export default Breadcrumb
