/* eslint-disable react/no-danger, jsx-a11y/html-has-lang */
import React from 'react'

const Html = ({ assets, content, helmet, sheet, loadableState, state }) => {
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
        {loadableState.getScriptElement()}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(
              state,
            ).replace(/</g, '\\u003c')};`,
          }}
        />
        <script src={assets.main.js} />
        <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `WebFont.load({ google: { families: ['Roboto:300,400,700'] } });`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
          },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
          a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
          // Insert Twitter Pixel ID and Standard Event data below
          twq('init','nxsfw');
          twq('track','PageView');`,
          }}
        />
        {helmet.script.toComponent()}
        {helmet.noscript.toComponent()}
      </body>
    </html>
  )
}

export default Html
