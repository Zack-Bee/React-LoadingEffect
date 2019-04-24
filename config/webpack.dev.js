const path = require('path')
const common = require('./webpack.common.js')
const merge = require('webpack-merge')
const webpack = require('webpack')

const config = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      include: [
        path.resolve(__dirname, '../example'),
        path.resolve(__dirname, '../src')
      ],
      options: {
        presets: [
          '@babel/react'
        ],
        plugins: [
          [
            '@babel/plugin-proposal-class-properties',
            {
              lose: false
            }
          ],
          ['react-hot-loader/babel']
        ]
      },
      exclude: path.resolve(__dirname, '../node_modules')
    }]
  },
  devServer: {
    host: '127.0.0.1',
    open: true,
    historyApiFallback: {
      index: '/index.html'
    },
    publicPath: '/',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
})

module.exports = config
