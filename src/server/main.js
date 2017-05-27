import config from 'server/config'
import app from 'server/app'

app.listen(config.get('server.port'))
