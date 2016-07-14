# 描述
最近Cloudshare项目进行前后端分离的重构，后端采用RESTful API返回JSON数据，前端尝试使用React，因此创建这个repo学习搭建前端开发工程环境。

---
# 项目文件结构
  * app
   * dist (构建后目录)
   * src (开发目录)
   * webpack (webpack配置文件目录)
  * package.json

---
# Webpack构建工具
## 1. 安装
作为项目依赖方式安装<br>
`npm install webpack --save-dev`

## 2. webpack基本配置简介
* entry: 项目入口文件
* output: 打包输出文件
* module: 模块加载器
* plugins: 附加的插件

[更多配置项参考文档](https://github.com/webpack/docs/wiki/configuration#configuration-object-content)

---
### 安装html-webpack-plugin
html-webpack-plugin插件可以帮助我们快速生成html<br>
安装: `npm install html-webpack-plugin --save-dev`<br>

** webpack.config.js编写 **<br>
```
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  ROOT_PATH: path.join(__dirname, '../'),
  APP_PATH: path.join(__dirname, '../src'),
  BUILD_PATH: path.join(__dirname, '../dist')
}

const config = {
  entry: PATHS.APP_PATH,

  output: {
    path: PATHS.BUILD_PATH,
    filename: 'bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hello World!'
    })
  ]
}

module.exports = config;
```
