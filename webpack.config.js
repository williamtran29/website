const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const production = process.env.NODE_ENV === 'production'

module.exports = {
  entry: path.join(__dirname, 'src/client/main.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'main.js',
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
    new webpack.LoaderOptionsPlugin({
      minimize: production,
      debug: false,
    }),
    ...(production ? [new webpack.optimize.UglifyJsPlugin()] : []),
    new HtmlWebpackPlugin({ title: 'Smooth Code' }),
  ],
  devServer: {
    proxy: {
      '*': {
        target: 'http://localhost:8000',
      },
    },
  },
}
