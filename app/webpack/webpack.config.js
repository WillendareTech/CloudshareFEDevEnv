const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const development = require('./dev.config.js');

const TARGET = process.env.npm_lifecycle_event;

process.env.BABEL_ENV = TARGET;

const PATHS = {
  ROOT_PATH: path.join(__dirname, '../'),
  APP_PATH: path.join(__dirname, '../src'),
  BUILD_PATH: path.join(__dirname, '../dist')
}

const config = {
  entry: [PATHS.APP_PATH],

  output: {
    path: PATHS.BUILD_PATH,
    filename: 'bundle.[hash].js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        include: PATHS.APP_PATH
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules',
        include: PATHS.APP_PATH
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: PATHS.APP_PATH + '/index.tpl.html',  //html模板文件
      inject: 'body',  //允许修改的内容
      filename: PATHS.BUILD_PATH + '/index.html',  //生成的html文件存放路径
      minify:{    //压缩HTML文件
        removeComments:true,    //移除HTML中的注释
        collapseWhitespace:false    //删除空白符与换行符
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}

// module.exports = config;

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(development, config);
}
