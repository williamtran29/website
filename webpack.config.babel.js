const path = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')

const DIST_PATH = path.join(__dirname, 'public/dist')
const production = process.env.NODE_ENV === 'production'
const prodPlugins = plugins => production ? plugins : []

module.exports = {
  entry: path.join(__dirname, 'src/client/main.js'),
  output: {
    path: DIST_PATH,
    filename: production ? '[name]-bundle-[hash].js' : '[name].js',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...prodPlugins([
      new webpack.LoaderOptionsPlugin({ minimize: true }),
      new AssetsPlugin({ path: DIST_PATH }),
      // new webpack.optimize.UglifyJsPlugin(),
    ]),
  ],
  devServer: {
    proxy: {
      '*': {
        target: 'http://localhost:8000',
      },
    },
  },
}
