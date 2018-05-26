/* eslint-disable react/no-danger, jsx-a11y/html-has-lang */
import React from 'react'

const StateScript = ({ state, name }) => (
  <script
    dangerouslySetInnerHTML={{
      __html: `window.${name} = ${JSON.stringify(state).replace(
        /</g,
        '\\u003c',
      )};`,
    }}
  />
)

const Html = ({
  assets,
  content,
  helmet,
  sheet,
  loadableState,
  apolloState,
}) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent()
  const bodyAttrs = helmet.bodyAttributes.toComponent()
  return (
    <html {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {sheet.getStyleElement()}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,700"
          as="style"
        />
      </head>
      <body {...bodyAttrs}>
        <div id="main" dangerouslySetInnerHTML={{ __html: content }} />
        {loadableState.getScriptElement()}
        <StateScript state={apolloState} name="__APOLLO_STATE__" />
        <script src={assets.main.js} />
        <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `WebFont.load({ google: { families: ['Roboto:300,400,700'] } });`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/ur91us5p';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()`,
          }}
        />
        {helmet.script.toComponent()}
        {helmet.noscript.toComponent()}
      </body>
    </html>
  )
}

export default Html
