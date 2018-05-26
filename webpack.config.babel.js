import path from 'path'
import webpack from 'webpack'
import AssetsPlugin from 'assets-webpack-plugin'

const DIST_PATH = path.resolve(__dirname, 'public/dist')
const production = process.env.NODE_ENV === 'production'
const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export default {
  mode: development ? 'development' : 'production',
  context: path.resolve(__dirname, 'src/client'),
  entry: ['regenerator-runtime/runtime', './main.js'],
  output: {
    path: DIST_PATH,
    filename: production ? '[name]-bundle-[hash].js' : '[name].js',
    publicPath: '/dist/',
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules', 'src'],
  },
  devtool: development ? 'cheap-module-source-map' : false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        sideEffects: false,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              'react',
              [
                'env',
                {
                  modules: false,
                  loose: false,
                  targets: {
                    uglify: true,
                    browsers: ['> 1%', 'last 2 versions'],
                  },
                },
              ],
            ],
            plugins: [
              [
                'module-resolver',
                {
                  root: ['./src'],
                },
              ],
              'loadable-components/babel',
              'transform-object-rest-spread',
              'transform-class-properties',
              ['lodash', { id: 'recompact' }],
              [
                'styled-components',
                {
                  ssr: true,
                },
              ],
              ...(development ? ['react-hot-loader/babel'] : []),
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /fr/),
    ...(production
      ? [new AssetsPlugin({ path: DIST_PATH })]
      : [new webpack.HotModuleReplacementPlugin()]),
  ],
  ...(development
    ? {
        devServer: {
          hot: true,
          contentBase: DIST_PATH,
          publicPath: '/dist/',
          proxy: {
            '*': {
              target: 'http://localhost:8000',
            },
          },
        },
      }
    : {}),
}
