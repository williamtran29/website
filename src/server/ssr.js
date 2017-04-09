import path from 'path'
import fs from 'mz/fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import config from 'server/config'
import App from 'client/App'

const PUBLIC = path.join(__dirname, '../../public')
const production = config.get('env') === 'production'

let assets
const getAssets = async () => {
  if (assets) return assets

  if (production) {
    const json = await fs.readFile(path.join(PUBLIC, 'dist/webpack-assets.json'), 'utf-8')
    assets = JSON.parse(json)
    return assets
  }

  assets = {
    main: {
      js: 'main.js',
    },
  }
  return assets
}

export default () => async ({ request, response }) => {
  const context = {}
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={request.url} context={context}>
      <App />
    </StaticRouter>,
  )

  if (context.url) {
    response.status = 301
    response.headers = { Location: context.url }
  } else {
    const assets = await getAssets()
    response.body = `
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <div id="main">${html}</div>
    <script src="/dist/${assets.main.js}"></script>
  </body>
</html>
    `
  }
}
