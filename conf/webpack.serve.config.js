const webpack = require('webpack');
const WebpackConfig = require('webpack-config').default;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const conf = require('./conf');

module.exports = new WebpackConfig()
  .extend('conf/webpack.base.config.js')
  .merge({
    entry: { // add entry points for HMR
      app: [`webpack-dev-server/client?http://localhost:${conf.servePort}/`, 'webpack/hot/dev-server']
    },
    devtool: 'inline-source-map', // make sure source maps are created
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(), // enable hot module replacement
      new webpack.NamedModulesPlugin(), // add names to modules
      new HtmlWebpackPlugin({ // inject styles and js to index.html
        template: conf.path.src('index.html')
      }),
      new ExtractTextPlugin({ // no need for separate css files in dev
        disable: true
      })
    ]
  });