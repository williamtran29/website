import path from 'path'
import convict from 'convict'
import { getAssets } from 'server/utils/webpack'

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'test', 'browser.development'],
    default: 'development',
    env: 'NODE_ENV',
  },
  chrome: {
    bin: {
      doc: 'Google Chrome binary',
      format: 'String',
      default: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      env: 'GOOGLE_CHROME_BIN',
    },
  },
  server: {
    externalUrl: {
      doc: 'The server external url',
      format: 'url',
      default: 'https://www.smooth-code.com',
    },
    port: {
      doc: 'The server port number',
      format: 'port',
      default: 8000,
      env: 'PORT',
    },
    logFormat: {
      doc: 'The morgan log format to use',
      format: ['dev', 'combined', 'common', 'short', 'tiny', ''],
      default: 'dev',
    },
    publicPath: {
      doc: 'The public path',
      format: String,
      default: path.join(__dirname, '../../public'),
    },
    assets: {
      webpackAssets: {
        doc: 'Use webpack-assets.json file',
        format: Boolean,
        default: false,
        env: 'WEBPACK_ASSETS',
      },
      main: {
        js: {
          doc: 'Public JS file',
          format: String,
          default: '/dist/main.js',
        },
      },
    },
  },
  sendgrid: {
    apiKey: {
      doc: 'SendDrid API key',
      format: String,
      default: '',
      env: 'SENDGRID_API_KEY',
    },
  },
  ghost: {
    host: {
      doc: 'Ghost host',
      format: String,
      default: '',
      env: 'GHOST_HOST',
    },
    clientId: {
      doc: 'Ghost client id',
      format: String,
      default: '',
      env: 'GHOST_CLIENT_ID',
    },
    clientSecret: {
      doc: 'Ghost client secret',
      format: String,
      default: '',
      env: 'GHOST_CLIENT_SECRET',
    },
  },
  graphql: {
    graphiql: {
      doc: 'Enable GraphiQL',
      format: Boolean,
      default: false,
    },
  },
})

const env = config.get('env')
config.loadFile(path.join(__dirname, `../../config/${env}.json`))
config.validate()

if (config.get('server.assets.webpackAssets')) {
  config.set(
    'server.assets',
    getAssets({ publicPath: config.get('server.publicPath') }),
  )
}

export default config
