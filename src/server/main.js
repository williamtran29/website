import path from 'path'
import Koa from 'koa'
import morgan from 'koa-morgan'
import favicon from 'koa-favicon'
import serve from 'koa-static'
import config from 'server/config'
import ssr from 'server/ssr'

const app = new Koa()

const PUBLIC = path.join(__dirname, '../../public')

app.use(morgan(config.get('server.logFormat')))
app.use(favicon(path.join(PUBLIC, 'favicon.ico')))
app.use(serve(PUBLIC))
app.use(ssr())
app.listen(8000)
