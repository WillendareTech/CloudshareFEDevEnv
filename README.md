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
* resolve: 指定可以import的文件后缀

[更多配置项参考文档](https://github.com/webpack/docs/wiki/configuration#configuration-object-content)

---
### 示例
* module_a.js
```
module.exports = function() {
  console.log('This is module a.');
}
```
* index.js
```
const moduleA = require('./module_a.js');
moduleA();
console.log('This is index.js.');
```

### 安装html-webpack-plugin
html-webpack-plugin插件可以帮助我们快速生成html

安装: `npm install html-webpack-plugin --save-dev`<br>

**html-webpack-plugin部分属性简介**

* template  //html模板文件
* inject    //允许修改的内容
* filename  //生成的html文件存放路径
* minify:   //压缩HTML文件
  * removeComments:true | false         //移除HTML中的注释
  * collapseWhitespace: true | false   //删除空白符与换行符
* hash      //为静态资源增加hash

---

#### webpack.config.js编写

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
  entry: [PATHS.APP_PATH],

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

执行 `cd webpack && webpack`

结果在dist目录下面会生成index.html和bundle.js，前者是html-webpack-plugin生成的html,后者是wepack构建之后的js文件。

---

### 安装webpack-dev-server
webpack-dev-server是一个开发服务器，每当我们更新代码时会自动刷新浏览器，省去了人工刷新页面的烦恼

安装: `npm install webpack-dev-server --save-dev`

#### 配置webpack-dev-server

##### Hot Module Replacement with node.js API

HMR是webpack中的模块热更换，在更新代码时不再刷新整个页面，而是更新变化的部分。

要使用nodejs API使用HMR，有三个步骤需要做：
* 在webpack配置项中增加`webpack/hot/dev-server`
* 在webpack配置项插件中增加`new webpack.HotModuleReplacementPlugin()`
* 增加 `hot:true` 在webpack-dev-server配置项中

---

##### 详细配置

server.js

```
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConf = require('./webpack/webpack.config.js');

const compiler = webpack(webpackConf);

const server = new WebpackDevServer(compiler, {
  //webpack-dev-server options

  contentBase: './app/',

  progress: true,

  inline: true,  //启用inline模式自动刷新

  hot: true,  //启动热加载

  historyApiFallback: true,

  compress: true,  //启用gzip压缩

});

webpackConf.entry.unshift('webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server');

server.listen(8080, 'localhost', function(err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:8080.');
});
```

在webpack.config.js中增加
```
plugins: [
  new webpack.HotModuleReplacementPlugin()
]
```

在package.json增加
```
"scripts": {
  "start": "node server.js"
}
```

执行`npm start`启动服务

[webpack-dev-server官方文档](http://webpack.github.io/docs/webpack-dev-server.html)

## 3.Babel与React
为了能够使用ES6特性并且向下支持浏览器，需要用到Babel

安装babel:

`npm install babel-core babel-loader babel-preset-es2015 babel-preset-react --save-dev`

在webpack中配置加载器

```
const config = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: 'babel',
        include: PATHS.APP_PATH
      }
    ]
  }
}
```

在根目录中添加Babel配置文件.babelrc

```
{
  "preset": ["es2015", "react"]
}
```

安装react和react-dom:

`npm install react react-dom --save`

> **Note:** 由于React需要在app中run，所以使用--save比--save-dev更好一些

安装react热模块替换(HMR)

`npm install babel-preset-react-hmre --save-dev`

~~在.babelrc增加~~

~~`presets: ["react-hmre"]`~~

鉴于热模块替换只需要在开发环境中使用，而不需要在生产环境中，因此可以利用一个BABEL_ENV环境变量来引入react-hmre

在webpack目录中创建开发环境配置文件dev.config.js

dev.config.js

```
const wepack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      },
      __DEVELOPMENT__: true
    }),
    new webpack.NoErrorsPlugin()
  ]
}
```

webpack.config.js

```
const merge = require('webpack-merge');

const development = require('./dev.config.js');

const TARGET = process.env.npm_lifecycle_event;

process.env.BABEL_ENV = TARGET;

...

// module.exports = config;

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(development, config);
}
```

.babelrc增加

```
"env": {
  "start": {
    "presets": [
      "react-hmre"
    ]
  }
}
```



#参考
* [Configuring React](http://survivejs.com/webpack/advanced-techniques/configuring-react/)
* [Webpack傻瓜指南（三）和React配合开发](https://zhuanlan.zhihu.com/p/20522487)
* [Using Webpack's Hot Module Replacement with React](http://matthewlehner.net/react-hot-module-replacement-with-webpack/)
* [React-Redux-Flask](https://github.com/dternyak/React-Redux-Flask)
* [Webpack | React 入门教程 - GitBook](https://hulufei.gitbooks.io/react-tutorial/content/webpack.html)
* [Webpack Tutorials](http://webpack.github.io/docs/tutorials/getting-started/)
