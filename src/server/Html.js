/* eslint-disable react/no-danger, jsx-a11y/html-has-lang */
import React from 'react'

const Html = ({ assets, content, helmet, sheet, state }) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent()
  const bodyAttrs = helmet.bodyAttributes.toComponent()
  return (
    <html {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {sheet.getStyleElement()}
      </head>
      <body {...bodyAttrs}>
        <div id="main" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(
              state,
            ).replace(/</g, '\\u003c')}`,
          }}
        />
        <script src={assets.main.js} />
        <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `WebFont.load({ google: { families: ['Roboto'] } });`,
          }}
        />
      </body>
    </html>
  )
}

export default Html
