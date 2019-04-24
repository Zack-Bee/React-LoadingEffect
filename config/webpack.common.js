const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './example/index.jsx'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../example/index.html')
    })
  ],
  module: {
    rules: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: require.resolve('snapsvg/dist/snap.svg.js'),
      use: 'imports-loader?this=>window,fix=>module.exports=0'
    }]
  },
  output: {
    publicPath: '/'
  },
  resolve: {
    alias: {
      snapsvg: 'snapsvg/dist/snap.svg.js'
    }
  }
}
