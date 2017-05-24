import path from 'path'
import webpack from 'webpack'
import AssetsPlugin from 'assets-webpack-plugin'

const DIST_PATH = path.resolve(__dirname, 'public/dist')
const production = process.env.NODE_ENV === 'production'
const development = process.env.NODE_ENV === 'development'

module.exports = {
  context: path.resolve(__dirname, 'src/client'),
  entry: [
    ...(development
      ? [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
      ]
      : []),
    './main.js',
  ],
  output: {
    path: DIST_PATH,
    filename: production ? '[name]-bundle-[hash].js' : '[name].js',
    publicPath: '/dist/',
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules', 'src'],
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'react',
              [
                'env',
                {
                  modules: false,
                  targets: {
                    browsers: ['last 2 versions'],
                  },
                },
              ],
            ],
            plugins: [
              'syntax-trailing-function-commas',
              'transform-object-rest-spread',
              'transform-class-properties',
              ...(development ? ['react-hot-loader/babel'] : []),
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether',
    }),
    ...(production
      ? [
        new webpack.LoaderOptionsPlugin({ minimize: true }),
        new AssetsPlugin({ path: DIST_PATH }),
          // new webpack.optimize.UglifyJsPlugin(),
      ]
      : [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()]),
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
