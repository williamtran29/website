import Koa from 'koa'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from 'client/App'

const app = new Koa()

// response
app.use(({ request, response }) => {
  const context = {}
  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={request.url}
      context={context}
    >
      <App />
    </StaticRouter>,
  )

  if (context.url) {
    response.status = 301
    response.headers = { Location: context.url }
  } else {
    response.body = `
      <!doctype html>
      <div id="app">${html}</div>
    `
  }
})

app.listen(8000)
