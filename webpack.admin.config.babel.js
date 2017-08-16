import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const DIST_PATH = path.resolve(__dirname, 'public-admin/dist')
const production = process.env.NODE_ENV === 'production'
const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

module.exports = {
  context: path.resolve(__dirname, 'src/client/admin'),
  entry: ['./main.js'],
  output: {
    path: DIST_PATH,
    filename: production ? '[name]-bundle-[hash].js' : '[name].js',
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
                    browsers: ['last 2 versions'],
                  },
                },
              ],
            ],
            plugins: [
              'syntax-dynamic-import',
              'transform-object-rest-spread',
              'transform-class-properties',
              ['lodash', { id: 'recompact' }],
              [
                'styled-components',
                {
                  ssr: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  ...(development
    ? {
        devServer: {
          contentBase: DIST_PATH,
          proxy: {
            '*': {
              target: 'http://localhost:3000',
            },
          },
        },
      }
    : {}),
}
