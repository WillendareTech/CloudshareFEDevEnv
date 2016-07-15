const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  ROOT_PATH: path.join(__dirname, '../'),
  APP_PATH: path.join(__dirname, '../src'),
  BUILD_PATH: path.join(__dirname, '../dist')
}

const config = {
  entry: [PATHS.APP_PATH],

  output: {
    path: PATHS.BUILD_PATH,
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: 'babel',
        include: PATHS.APP_PATH,
        query: {
          preset: ['es2015', 'react']
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hello World'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = config;
