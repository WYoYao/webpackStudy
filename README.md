### webpack文档

`Webpack`是一个JavaScript及相关资源模块化管理及打包工具。它能将许多松散的模块及其依赖项打包为一个适合于生产的前端资源。它的代码折分功能还可以对所要加载的模块进行分隔，待程序需要的时候再加载所需内容。通过`loaders`(加载器)，让你可加载任何模块或资源，如：可以是CommonJs、AMD、ES6等模块；可以是CSS、 Images、JSON、Coffeescript、LESS等资源；也可以是你自定义的内容。

1.  [介绍](#introduce)
    *   [1.1 简介](#about)
    *   [1.2 Webpack 特点](#feature)
2.  [操作指引](#getting-started)
    *   [2.1 安装](#install)
    *   [2.2 使用](#start)
    *   [2.3 配置](#config)
    *   [2.4 插件](#plugin)
    *   [2.5 优化、监控、开发模式](#prettier-watch)
3.  [CLI命令行参数](#cli)
    *   [3.1 语法格式](#syntax)
    *   [3.2 命令参数](#cli-option)
4.  [配置对象](#configuration)
    *   [4.1 配置文件的使用](#config-usage)
    *   [4.2 配置参数](#config-options)

## 1\. 介绍

### 1.1 简介

Webpack 是一个模块打包器。它的主要目的是把JavaScript文件捆绑到浏览器环境中使用，也能够支持转换、绑定、或者打包任何形式的资源。它会根据模块的依赖关系进行静态分析，然后将这些模块按指定的规则生成对应的静态资源。

*   打包模块可以是CommonJS 或 AMD模块
*   可以创建为一个打包文件或在运行时异步加载的多个文件
*   编译过程中解决依赖关系，减少运行时大小
*   加载器可以在编译过程中预处理文件，如：将coffeescript转换为JavaScript、把字符串编译为函数、把图片转换为Base64编码的字符串
*   高度模块化的插件系统来，让你可以实现程序所需要任何其他功能

### 1.2 Webpack 特点

**插件系统**

Webpack 具有丰富的插件接口，它的大部分功能，及Webpack本身也依赖这个接口实现。通过开发或使用 Webpack 插件，可以满足各种需求，这使其非常灵活和强大。

**性能**

Webpack 使用异步I/O和多级缓存。这使得Webpack 能够以难以致信的速度增量编译。

**加载器**

Webpack 本身只能处理原生 JavaScript 模块，但是`loader`转换器可以将各种类型的资源都转换成 JavaScript 模块。这样，任何资源都可以成为 Webpack 可以处理的模块。如果现有加载器不能满足你的需要时，还可以使用Node.js[编写你自己的 loader](https://webpack.github.io/docs/loaders.html)。

以下是一些常用加载器：

_基础_

*   [`json`](https://github.com/webpack/json-loader): 加载 JSON 文件
*   [`raw`](https://github.com/webpack/raw-loader): 加载文件原始内容(utf-8 编码)
*   [`val`](https://github.com/webpack/val-loader): 执行代码模块化，并考虑导出为JavaScript代码
*   [`script`](https://github.com/webpack/script-loader): 在全局上下文件中执行一次 JavaScript 文件(类似 script 标签)，需要不被解析

_打包_

*   [`file`](https://github.com/webpack/file-loader): 将文件发送到指定输出目录，并返回URL(相对)
*   [`url`](https://github.com/webpack/url-loader): 类似于`file`加载器，如果文件小于限制值会返回一个 Data Url
*   [`image`](https://github.com/tcoopman/image-webpack-loader): 压缩图片。像是一起使用 `file` 和 `url`
*   [`svgo-loader`](https://github.com/rpominov/svgo-loader): 使用[svgo](https://github.com/svg/svgo)库压缩SVG图片
*   [`baggage`](https://github.com/deepsweet/baggage-loader): 自动引入与所需资源相关的文件
*   [`polymer-loader`](https://github.com/JonDum/polymer-loader): 在“预处理”选择后处理 HTML & CSS 并像一级模块一样`require()`引入Web组件

_语言支持_

*   [`coffee`](https://github.com/webpack/coffee-loader): 像加载JavaScript一样加载 coffee-script
*   [`babel`](https://github.com/babel/babel-loader): 使用[Babel](http://itbilu.com/nodejs/npm/41K9OSwpe.html) 将 ES6 代码转换为 ES5
*   [`livescript`](https://github.com/appedemic/livescript-loader): 像加载JavaScript一样加载 LiveScript
*   [`sweetjs`](https://github.com/jlongster/sweetjs-loader): 使用 sweetjs macros.
*   [`traceur`](https://github.com/jupl/traceur-loader): 通过 [Traceur](https://github.com/google/traceur-compiler)使用未来JavaScript的语法特性
*   [`typescript`](https://github.com/andreypopp/typescript-loader): 像加载JavaScript一样加载 TypeScript

_模板_

*   [`html`](https://github.com/webpack/html-loader): 将HTML做为字符串导出，需要做为静态资源引用
*   [`jade`](https://github.com/webpack/jade-loader): 加载 jade 模板，并返回一个函数
*   [`handlebars`](https://github.com/altano/handlebars-loader): 加载 handlebars 模板，并返回一个函数
*   [`ractive`](https://github.com/rstacruz/ractive-loader): 在交互式DOM操作中预编译 Ractive 模板
*   [`markdown`](https://github.com/peerigon/markdown-loader): 将 Markdown 编译为 HTML
*   [`ng-cache`](https://github.com/teux/ng-cache-loader): 把 HTML 部分放入 Angular 的 $templateCache中

_样式_

*   [`style`](https://github.com/webpack/style-loader): 添加一个DOM式的模块导出
*   [`css`](https://github.com/webpack/css-loader): 从绝对路径加载CSS文件，并返回CSS代码
*   [`cssnext`](https://github.com/MoOx/cssnext-loader): 通过[cssnext](http://cssnext.io/)加载并编译CSS
*   [`less`](https://github.com/webpack/less-loader): 加载并编译一个 less 文件
*   [`sass`](https://github.com/jtangelder/sass-loader): 加载并编译一个 scss 文件
*   [`stylus`](https://github.com/shama/stylus-loader): 加载并编译一个 stylus 文件

_混合_

*   [`po`](https://github.com/perchlayer/po-loader): 加载一个PO gettext文件并返回JSON
*   [`mocha`](https://github.com/webpack/mocha-loader): 在[browser](http://itbilu.com/nodejs/npm/Vkj0boZ5l.html) 或 node.js 中使用[mocha](http://itbilu.com/nodejs/npm/VyrFOe51-.html)进行测试
*   [`eslint`](https://github.com/MoOx/eslint-loader): 使用ESLint 对剥离的代码进行预加载
*   [`jshint`](https://github.com/webpack/jshint-loader): 预加载剥离的代码
*   [`jscs`](https://github.com/unindented/jscs-loader): 预加载样式检查
*   [`injectable`](https://github.com/jauco/webpack-injectable): 允许依赖注入到模块中
*   [`transform`](https://github.com/webpack/transform-loader): 使用 browserify 转换加载

全部加载器请查看[list of loaders](https://webpack.github.io/docs/list-of-loaders.html)。更多关于加载器的介绍请参考：[Using Loader](https://webpack.github.io/docs/using-loaders.html)

**模块格式(AMD/CommonJS)**

Webpack 支持AMD/CommonJS两种风格的模块。它会智能的静态解析你的代码，它甚至有一个评估引擎来支持使用简单的动态表达式(如：`require("./templates/" + name + ".jade")`)，这样就可以处理几乎任何第三方库。

**代码折分**

Webpack 有两种组织模块依赖的方式：同步和异步。异步依赖允许你将代码分成多个块，将每一个异步块都做为一个文件被打包，并在运行时异步加载。这降低了初始加载时间。

参考：[Code Splitting](https://webpack.github.io/docs/code-splitting.html)

## 2\. 操作指引

本文操作示例源码可以通过以下网址查看：

[https://github.com/itbilu/webpack-examples/tree/master/start](http://note.youdao.com/)

### 2.1 安装

`Webpack`是一个[NPM](http://itbilu.com/nodejs/core/NJ-vTdf.html)包，而 NPM 会随[Node.js](https://nodejs.org/en/download/)的安装而安装，所以安装Webpack前，应该首先安装Node.js。

安装后就可以使用`npm`命令来安装Webpack：

```
npm install webpack -g
```

这样就全局安装了Webpack，然后就能在命令行使用`webpack`命令进行相关操作了。

如果不需要全局安装，请使用以下命令，非全局安装会在当前目录下创建`node_modules`文件夹：

```
npm install webpack
```

### 2.2 使用

**简单使用**

安装后，新建一个空目录开始接下来的操作。

创建入口文件`entry.js`：

```
document.write('It works.')
```

创建静态页`index.html`：

```
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <script type="text/javascript" src="bundle.js" charset="utf-8"></script>
  </body>
</html>
```

使用`webpack`命令，将`entry.js`打包到`bundle.js`。如下：

```
webpack ./entry.js bundle.js
```

这会编译并创建打包文件`bundle.js`。

执行成功后，输出日志类似如下：

```
Hash: a41c6217554e666594cb
Version: webpack 1.13.1
Time: 78ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.42 kB       0  [emitted]  main
   [0] ./entry.js 29 bytes {0} [built]
```

操作完成后，用浏览器打开`index.html`文件，而面会显示`It works.`。

以上示例`github`地址：

[https://github.com/itbilu/webpack-examples/tree/master/start](http://note.youdao.com/)

**添加一个模块**

接下外，添加另外一个文件。这个文件将做为一个模块被`entry.js`引入，要添加的文件名为`content.js`，其内容如下：

```
module.exports = "It works from content.js.";
```

在`entry.js`中引用：

```
document.write("It works.");
document.write(require("./content.js"));
```

重新编译打包：

```
webpack ./entry.js bundle.js
```

重新打开`index.html`或刷新页面后，页面显示如下：

```
It works.It works from content.js.
```

Webpack 会分析入口文件，解析存在依赖关系的各个文件。这些文件（模块）都被打包到`bundle.js`文件中。Webpack 会为每个模块分配一个唯一的`id`并通过这个`id`索引和访问模块。页面启动时，首先会执行`entry.js`中的代码，其它模块会在运行`require`时再执行。

以上示例源码地址如下：

```
https://github.com/itbilu/webpack-examples/tree/master/secondFile
```

### 2.3 Loader

**第一个Loader**

接下来，我们想在就用中添加 css 样式文件。

Webpack 本身只能处理 JavaScript，所以我们需要`css-loader`来处理 css 文件，同样需要`style-loade` 来应用 css 文件中的样式。

使用`npm`命令安装这两个模块：
```
npm install css-loader style-loader
```

这里并没有使用`-g`参数全局安装，模块会安装在`node_modules`目录下，webpack会实时加载。

添加一个`style.css`文件，文件内容如下：

```
body { background: yellow; }
```

更新`entry.js`，添加对样式文件的引用：

```
require("!style!css!./style.css");
document.write(require("./content.js"));
```

重新编译打包，并刷新页面会发现页面背景已经变为黄色：

```
webpack ./entry.js bundle.js
```

以上示例源码：

[点击](http://note.youdao.com/)

也可以通过`package.json`来管理依赖项，请参考：[NPM 包管理中package.json文件的使用](http://itbilu.com/nodejs/npm/Nkq9GPy1Z.html)

**Loader 绑定**

在上面示例中我们引用样式文件`require("!style!css!./style.css");`，`webpack`会按前缀应用合适`loader`，但这样写比较敏锁，我们可以根据模块类型（扩展名）来自动绑定需要的 `loader`。

将`entry.js`文件修改如下：

```
require("./style.css");
document.write(require("./content.js"));
```

然后运行以下打包/编译命令：

```
webpack entry.js bundle.js --module-bind 'css=style!css'
```

两种方式运行结果是一样的。示例源码：

```
https://github.com/itbilu/webpack-examples/tree/master/bindingLoader
```

**`Loader`的一些介绍**

Webpack 本身只能处理 JavaScript 文件，如果要处理其他类型的文件，就需要使用加载器-`loader`进行转换。Loader 是一个函数(Node.js中运行)，接受资源文件作为参数，并返回转换的结果。这样，Webpack 就可以通过`require`加载任何类型的模块或文件，如：CoffeeScript、 JSX、图片等。

Loader具有如下特征：

*   Loaders 加载的资源可以管道的方式链式调用，每次加载都可以返回任意格式的资源并传递给下一个loader，但最后一个loader返回的必须是 JavaScript。
*   Loaders 可以是同步或异步的。
*   Loaders 在 Node.js 环境下运行，所以可以做任何可能的事情。
*   Loaders 可以接收查询参数，这样就可以把配置项传递给 loader
*   Loader 可以通过文件扩展名或正则表达式绑定给不同类型的文件
*   Loaders 可以通过`npm`发布和安装
*   除了通过 `package.json` 来指定`main`入口外，通常模块也可以导出一个`loader`来使用
*   Loaders 可以访问配置
*   插件系统让 loaders 可以拥有更多特征
*   Loaders 可以分发出任意类型的附加文件

Loader 其本身也是在 Node.js 环境中的 JavaScript 模块，它通常会返回一个函数。大多数情况下，我们可以通过 `npm` 来管理和查看所需的`loader`，当然也可以在项目中自己写 `loader` 模块。

按照惯例(非必须)，`loader`一般以 `xxx-loader` 的规则命名，`xxx` 表示这个 `loader` 要做的转换功能，如：`json-loader`。而在引用`loader` 时，可以使用全名`json-loader`，也可以使用简写形式`json`。

Webpack 的命名规则和搜索优先级顺序在其`resolveLoader.moduleTemplates api`中的定义如下：

```
Default: ["*-webpack-loader", "*-web-loader", "*-loader", "*"]
```

Loader 可以在 `require()`引用模块的时候添加，也可以在 Webpack 全局配置中进行绑定，还可以通过命令行的方式使用。

### 2.3 配置

Webpack 可以在命令行传入参数，也可以通过配置文件来指定。默认情况下，会搜索当前目录下的`webpack.config.js`文件，这个文件是一个Node.js模块，它会返回一个 JSON 格式的配置信息对象，或者通过`--config`选项来指定配置文件。

**一个配置文件**

可以将上例中的配置通一个配置文件来指定。

添加`webpack.config.js`文件：

```
module.exports = {
  entry: "./entry.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ]
  }
};
```

添加后只需要简单的执行：

```
webpack
```

单独执行`webpack`命令时，会尝试从当前目录下查找`webpack.config.js`文件，并应用这个配置。

以上示例源码：

[点击](http://note.youdao.com/)


### 2.4 插件

`loader`用于加载和转换非JavaScript格式的文件，对于`loader`不能完成的功能可以借助插件来完成。

插件可以在 Wecpack 配置文件的`plugins`选项中指定。Wecpack本身内置了一些常用插件，还可以通过`npm`安装所需的插件。

修改前面示例中的配置文件，添加一个`BannerPlugin`插件，该插件用于添加注释信息。

修改`webpack.config.js`如下：

```
var webpack = require('webpack')

module.exports = {
  entry: "./entry.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('这是一个注释')
  ]
};
```

运行`webpack`后，生成的`bundle.js`文件的开头后包含一行注释信息：

```
/*! 这是一个注释 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
```

以上示例源码：

```
https://github.com/itbilu/webpack-examples/tree/master/plugins
```

### 2.5 优化、监控、开发模式

**优化显示**

如果项目打包编译时间太长，我们可能希望添加一个进度条，或者我们需要改变显示颜色。可以添加设置参数：

```
webpack --progress --colors
```

**监控模式**

如果不想手动编译每次修改，可以通过`--watch`添加监控模式：

```
webpack --progress --colors --watch
```

**开发模式**

项目开发过程中，可以使用`webpack-dev-server`来代替`webpack`。首先需要全局安装这个模块：

```
npm install webpack-dev-server -g
```

安装后就可以使用开发模式：

```
webpack-dev-server --progress --colors
```

## 3\. CLI命令行参数

### 3.1 语法格式

全局安装 Webpack 后，就可以命令行中使用`webpack`命令。其语法格式如下：

```
webpack <entry> <output>
```

*   `entry` - 该选项会被映射为配置文件的`entry`配置参数。传入的一个文件或请求字符串。可以传入多个条目，每一条会在启动时自动加载。

    如果传入一个`<name>=<request>`对，那么可以创建一个额外的入口点。

*   `output` - 输出文件路径。该选项会被映射为配置文件的`output.path`和`output.filename`配置参数

### 3.2 命令参数

Webpack `CLI`命令行中可以传入一些参数，可以通过`-h`、`--help`或`-?`查看全部参数：

```
webpack -h
```

以下是一些常用参数说明：

**配置选项**

配置文件中配置参数很多都被映射到CLI命令行参数，如：

*   `--debug` - 对应配置文件中的`debug: true`
*   `--output-library-target` - 对应配置文件中的`output.libraryTarget`

**插件参数**

一些插件也被映射为CLI参数，如：

*   `--define <string<=<string<` - 对应配置文件中的`DefinePlugin`

**开发模式**

开发模式可以使用简写，或全写形式：

*   `-d` - 开发模式，简写
*   `--debug``--devtool source-map``--output-pathinfo` - 开发模式，全写

**生产模式**

生产模式同样可以使用简写，或全写形式：

*   `-p` - 生产模式，简写
*   `--optimize-minimize``--optimize-occurence-orde` - 开发模式，全写

**监控模式**

*   --watch

**显示选项**

*   `--progress` - 显示编译进度到stderr
*   `--json` - 向stdout输出一个JSON格式
*   `--no-color` - 禁用统计数据的颜色
*   `--sort-modules-by, --sort-chunks-by, --sort-assets-by` - 排序modules/chunks/assets列表列
*   `--display-chunks` - 显示模块的分隔块信息
*   `--display-reasons` - 显示包含的模块的详细原因
*   `--display-error-details` - 显示错误详细信息
*   `-display-modules` - 显示隐藏模块
*   `-display-exclude` - 在输出中排除模块

**执行概况**

如果想更深入的了解执行花费了多长时间，可以使用`--profile`配置开关。该选项会使Webpack显示一个更加详细的时序信息，结合前面的一些配置项，可以得到一个很详细的模块执行时序及信息集。

显示信息集中，会包含以下信息：

*   `factory` - 建立模块所花费的时间
*   `building` - 构建模块所花费的时间
*   `dependencies` - 查找和连接依赖项所花费的时间

## 4\. 配置对象

### 4.1 配置文件的使用

Webpack 可以接收一个配置对象(配置文件)，有两种方式来传入这个配置对象。

**CLI 中使用配置对象**

如果使用[CLI](#cli)，它默认会读取`webpack.config.js`文件(或通过`--config`选项指定配置文件)。所使用的配置文件必须导出一个配置对象：

```
module.exports = {
    // configuration
};
```

**Node.js API**

如果要在[Node.js API](https://webpack.github.io/docs/node.js-api.html)中使用配置对象，需要将其做为一个参数传入：

```
webpack({
    // configuration
}, callback);
```

**多次配置**

在上面两种使用场景中，也可以使用一个配置数组，这些配置会并行处理。它们会共享文件系统缓存和监视器，这比多次调用Webpack效率更高。

### 4.2 配置参数

配置对象的形式不需要写为一个JSON文件(但支持JSON文件的形式)，而可以是任何JavaScript所支持的形式，它仅是一个Node.js模块。

以下是一个简单的配置对象：

```
{
  context: __dirname + "/app",
  entry: "./entry",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  }
}
```

在配置对象中，可能会包含以下参数：

*   [`context`](#context)
*   [`entry`](#entry)
*   [`output`](#output)
    *   [`output.filename`](#output-filename)
    *   [`output.path`](#output-path)
    *   [`output.publicPath`](#output-publicPath)
    *   [`output.chunkFilename`](#output-chunkFilename)
    *   [`output.sourceMapFilename`](#output-sourceMapFilename)
    *   [`output.devtoolModuleFilenameTemplate`](#output-devtoolModuleFilenameTemplate)
    *   [`output.devtoolFallbackModuleFilenameTemplate`](#output-devtoolFallbackModuleFilenameTemplate)
    *   [`output.devtoolLineToLine`](#output-devtoolLineToLine)
    *   [`output.hotUpdateChunkFilename`](#output-hotUpdateChunkFilename)
    *   [`output.hotUpdateMainFilename`](#output-hotUpdateMainFilename)
    *   [`output.jsonpFunction`](#output-jsonpFunction)
    *   [`output.hotUpdateFunction`](#output-hotUpdateFunction)
    *   [`output.pathinfo`](#output-pathinfo)
    *   [`output.library`](#output-library)
    *   [`output.libraryTarget`](#output-libraryTarget)
    *   [`output.umdNamedDefine`](#output-umdNamedDefine)
    *   [`output.sourcePrefix`](#output-sourcePrefix)
    *   [`output.crossOriginLoading`](#output-crossOriginLoading)
*   [`module`](#module)
    *   [`module.loaders`](#module-loaders)
    *   [`module.preLoaders`，`module.postLoaders`](#module-preLoaders-module-postLoaders)
    *   [`module.noParse`](#module-noParse)
*   [`resolve`](#resolve)
    *   [`resolve.alias`](#resolve-alias)
    *   [`resolve.root`](#resolve-root)
    *   [`resolve.modulesDirectories`](#resolve-modulesDirectories)
    *   [`resolve.fallback`](#resolve-fallback)
    *   [`resolve.extensions`](#resolve-extensions)
    *   [`resolve.packageMains`](#resolve-packageMains)
    *   [`resolve.packageAlias`](#resolve-packageAlias)
    *   [`resolve.unsafeCache`](#resolve-unsafeCache)
*   [`resolveLoader`](#resolveLoader)
    *   [`resolveLoader.moduleTemplates`](#resolveLoader-moduleTemplates)
*   [`externals`](#externals)
*   [`target`](#target)
*   [`bail`](#bail)
*   [`profile`](#profile)
*   [`cache`](#cache)
*   [`watch`](#watch)
*   [`watchOptions.aggregateTimeout`](#watchOptions-aggregateTimeout)
*   [`watchOptions.poll`](#watchOptions-poll)
*   [`debug`](#debug)
*   [`devtool`](#devtool)
*   [`devServer`](#devServer)
*   [`node`](#node)
*   [`amd`](#amd)
*   [`loader`](#loaderloader)
*   [`recordsPath`，`recordsInputPath`，`recordsOutputPath`](#recordsPath-recordsInputPath-recordsOutputPath)
*   [`plugins`](#plugins)

**`context` - 运行目录**

`entry`选项所使用的基础目录(绝对路径)。如果设置`output.pathinfo`，则是路径是到这个目录的简短形式

```
默认：process.cwd()
```

**`entry` - 入口点**

打包文件的入口点

如果传入的是一个字符串：字符串将被解析为一个模块，该模块会在启动时加载。

如果传入的是一个数组：那么所有模块都会在启动时加载，并且导出最后一个。

```
entry: ["./entry1", "./entry2"]
```

如果传入一个对象：多个入口会被创建，创建文件名即对象的键名。

```
{
  entry: {
    page1: "./page1",
    page2: ["./entry1", "./entry2"]
  },
  output: {
    // 当使用多个入口点时
    // 确保 output.filename 中使用 [name] 或 [id]
    filename: "[name].bundle.js",
    chunkFilename: "[id].bundle.js"
  }
}
```

**`output` - 输出设置**

`output`用于编译后的输出设置，该项会告诉Webpack怎样将编译后的文件写入磁盘。虽然可能有多个`entry`(入口点)，但该输出配置只有一个。

如果使用哈希(`[hash]`或`[chunkhash]`)，应确保其与模块顺序一致。使用`OccurenceOrderPlugin`或`recordsPath`

**`output.filename` - 输出文件名**

指定硬盘上每个输出文件的文件名。这里不能使用绝对路径，而应该通过`output.path`来指定输出路径。

_单个入口_

```
{
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: './built'
  }
}

// 会写入: ./built/bundle.js
```

_多个入口_

如果创建多个“块”时，应该使用以下项来替代名称，确认生成文件名的唯一性：

*   `[name]` - 会替代每个分块的名称
*   `[hash]` - 被编译的哈希值所替代
*   `[chunkhash]` - 被分块的哈希值所替代

```
{
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/built'
  }
}

// 输出为: ./built/app.js, ./built/search.js
```

**`output.path` - 输出文件目录**

设置输出文件的绝对路径(必须)

*   `[hash]` - 被编译的哈希值所替代

**`output.publicPath` - 访问路径**

`publicPath`用于设置输出文件在浏览器环境访问的中路径，即：URL。对于 loader 来说这会是一个内嵌的`<script>`或`>link>`标签或一个对图片等资源，`publicPath`做为文件的`herf`或`url()`链接。当你的输出文件不在同一台主机或在一个CDN上输出文件时，这一选项会非常有用。

使用示例：_config.js_

```
output: {
  path: "/home/proj/public/assets",
  publicPath: "/assets/"
}
```

_index.html_

```
<head>
  <link href="/assets/spinner.gif"/>
</head>
```

一个使用CDN及文件哈希的示例。_config.js_

```
output: {
  path: "/home/proj/cdn/assets/[hash]",
  publicPath: "http://cdn.example.com/assets/[hash]/"
}
```

用于设置非入口分块的文件名，文件名是相对`output.path`目录的相对路径。

*   `[id]` - 替代文件的ID
*   `[name]` - 替代文件名
*   `[hash]` - 被编译的哈希值所替代
*   `[chunkhash]` - 被分块的哈希值所替代

**`output.sourceMapFilename` - SourceMap文件名**

设置JavaScript的SourceMap文件，其位于`output.path`目录

*   `[file]` - 替代JavaScript的文件名
*   `[id]` - 替代分块的ID
*   `[hash]` - 被编译的哈希值所替代

默认值："[file].map"

**`output.devtoolModuleFilenameTemplate` - 文件名模板字符串**

在 SourceMap 中生成`source`数组是函数，这个配置项就是这个函数所在的文件名模板字符串。

*   `[resource]` - 会替换 Webpack 解析文件的路径替，如果有Loader也包括`loader`最右边的`query`参数。
*   `[resource-path]]` - 跟 resource配置项一样，但不会带query参数。
*   `[loaders]` - `loader`列表，带最右边的参数（明确的`loader`）。
*   `[all-loaders]` - `loader`列表，带最右边的参数（包括自然生效的`loader`）。
*   `[id]` - 会替换为模块的id。
*   `[hash]` - 会替换为模块标识符哈希值。
*   `[absolute-resource-path]` - 会被文件的绝对路径文件名替换。

默认值 (devtool=[inline-]source-map): "webpack:///[resource-path]"
默认值 (devtool=eval): "webpack:///[resource-path]?[loaders]"
默认值 (devtool=eval-source-map): "webpack:///[resource-path]?[hash]"

**`output.devtoolFallbackModuleFilenameTemplate` - 文件名模板字符串**

类似`devtoolModuleFilenameTemplate`，但是用在混合模块儿标识中

默认值："webpack:///[resourcePath]?[hash]"

**`output.devtoolLineToLine` - 行到行的Map模式**

启用所有/指定模块的行到行映射模式。该映射模式，使用一个简单的SourceMap在每一行生成的源，映射到原始来源相同的行。

`true`－使它对所有模块生效(不推荐)

默认值：disabled

**`output.hotUpdateChunkFilename` - 热更新分块文件名**

热更新分块(chunk)文件名，文件位于`output.path`目录

*   `[id]` - 替换为分块的id
*   `[hash]` - 替换为文件的哈希值

默认值：“[hash].hot-update.json”

**`output.hotUpdateMainFilename` - 热更新主文件名**

热更新主文件的文件名，文件位于`output.path`目录

*   `[hash]` - 替换为文件的哈希值

默认值："[hash].hot-update.json"

**`output.jsonpFunction` - 分块异步加载函数**

一个用于Webpack分块文件异步加载的JSONP函数

默认值：“webpackJsonp”

**`output.hotUpdateFunction` - 热更新分块异步加载函数**

一个用于Webpack热更新分块文件异步加载的JSONP函数

默认值：“webpackHotUpdate”

**`output.pathinfo` - 模块信息**

显示模块的评论信息：

require(/* ./test */23)
该选项不能用于生产模式

默认值：false

**`output.library` - 导出为库**

设置此项后，模块会导出为库。`output.library`就是库名

**`output.libraryTarget` - 格式化导出库**

格式化导出库：

*   `"var"` - 设置一个导出变量。默认：`var Library =xxx`
*   `"this"` - 设置一个`this`属性导出：`var Library =xxx`
*   `"commonjs"` - 设置一个`exports`属性导出：`exports["Library"] = xxx`
*   `"commonjs2"` - 设置一个`module.exports`属性导出：`module.exports=xxx`
*   `"amd"` - 按AMD规范导出
*   `"umd"` - 按AMD规范导出，CommonJS2或设置为一个root属性

默认值："var"

**`output.umdNamedDefine` - 设置UMD名称**

如果`output.libraryTarget`设置为`umd`，且`output.library`也设置了。此项设置为`true`，将为AMD模块命名

**`output.sourcePrefix` - 设置绑定资源前缀**

为绑定(bundle)资源设置一个前缀

默认: “\t”

**`output.crossOriginLoading` - 设置可跨域加载**

这一选项的用于设置是否允许跨域加载分块。可选项有：

*   `false` - 不允许跨域加载。默认
*   `anonymous` - 允许跨域加载，设置为此项时请求中没有安全证书发送
*   `use-credentials` - 允许跨域加载，且使用安全证书

**`module` - 模块设置**

此选项会影响正常的模块形为(`NormalModuleFactory`)

**`module.loaders` - 使用的`loader`**

将自动使用的`loader`数组。每个都可以有以下属性：

*   `test`: 一个必须满足的条件
*   `exclude`: 一个排除的条件
*   `include`: 要用Loader转换的导入文件的路径数组
*   `loader`: 一个用“！”隔开 loader的字符串
*   `loaders`: 一个loader字符串的数组

一个条件可以是正则表达式，或含有绝对路径的字符串，或一个函数`function(absPath): bool`，或一个将用`'and'`连接的数组。

详细介绍参见：[loaders](http://webpack.github.io/docs/loaders.html)

module.loaders: [ { // "test" 通常用于匹配文件扩展名 test: /\.jsx$/, // "include" 通常用于匹配文件目录 include: [ path.resolve(__dirname, "app/src"), path.resolve(__dirname, "app/test") ], // "exclude" 应该用于排除例外 // 应该尽可能的使用 "include" // the "loader" loader: "babel-loader" } ]

**`module.preLoaders`,`module.postLoaders` - 预/后加载的`loader`**

语法与`module.loaders`一样，一个运行在`loader`之前或之后的`loader`数组

**`module.noParse` - 不解析的文件**

一个RegExp或RegExp数组，用于匹配不解析的文件

**`resolve` - 配置模块的解析方案**

配置模块的解析方案的选项

**`resolve.alias` - 别名设置**

用另一个模块或路径来替换模块

预期是一个对象，这个对象的key是模块的名称，value是一个新的路径。它类似于一个替换，但更智能一些。如果key以`<div class="post_content"结尾，则会精确替换。

| `alias:` | `require(<span class="string">"xyz"</span>)` | `require(<span class="string">"xyz/file.js"</span>)` |
| --- | --- | --- |
| `{}` | `/abc/node_modules/xyz/index.js` | `/abc/node_modules/xyz/file.js` |
| `{ xyz: <span class="string">"/absolute/path/to/file.js"</span> }` | `/absolute/path/to/file.js` | `/abc/node_modules/xyz/file.js` |
| `{ xyz$: <span class="string">"/absolute/path/to/file.js"</span> }` | `/absolute/path/to/file.js` | error |
| `{ xyz: <span class="string">"./dir/file.js"</span> }` | `/abc/dir/file.js` | `/abc/node_modules/xyz/file.js` |
| `{ xyz$: <span class="string">"./dir/file.js"</span> }` | `/abc/dir/file.js` | error |
| `{ xyz: <span class="string">"/some/dir"</span> }` | `/some/dir/index.js` | `/some/dir/file.js` |
| `{ xyz$: <span class="string">"/some/dir"</span> }` | `/some/dir/index.js` | `/abc/node_modules/xyz/file.js` |
| `{ xyz: <span class="string">"./dir"</span> }` | `/abc/dir/index.js` | `/abc/dir/file.js` |
| `{ xyz: <span class="string">"modu"</span> }` | `/abc/node_modules/modu/index.js` | `/abc/node_modules/modu/file.js` |
| `{ xyz$: <span class="string">"modu"</span> }` | `/abc/node_modules/modu/index.js` | `/abc/node_modules/xyz/file.js` |
| `{ xyz: <span class="string">"modu/some/file.js"</span> }` | `/abc/node_modules/modu/some/file.js` | error |
| `{ xyz: <span class="string">"modu/dir"</span> }` | `/abc/node_modules/modu/dir/index.js` | `/abc/node_modules/dir/file.js` |
| `{ xyz: <span class="string">"xyz/dir"</span> }` | `/abc/node_modules/xyz/dir/index.js` | `/abc/node_modules/xyz/dir/file.js` |
| `{ xyz$: <span class="string">"xyz/dir"</span> }` | `/abc/node_modules/xyz/dir/index.js` | `/abc/node_modules/xyz/file.js` |

**`resolve.root` - 模块的根目录**

模块的包含目录，即：根目录。也可能是目录的数组。需要将单个目录添加到搜索路径时，才使用这个设置。

示例：

```
var path = require('path');

// ...
resolve: {
  root: [
    path.resolve('./app/modules'),
    path.resolve('./vendor/modules')
  ]
}
```

**`resolve.modulesDirectories` - 模块查找目录**

一个目录数组。这个目录将解析给当前目录以及它的祖先目录，并在这里查找模块。它的功能类似于Node 的`node_modules`目录。例如，如果把它设置为`["mydir"]`，Webpack 会查找`“./mydir”`、`”../mydir”`、`”../../mydir”`等目录。

默认值：`["web_modules", "node_modules"]`

**`resolve.fallback` - 最终查找目录**

一个目录或包含目录绝对路径的数组。当Webpack从`resolve.root`和`resolve.modulesDirectories`找不到模块时，会从这个目录查找。

**`resolve.extensions` - 模块扩展名**

一个包含模块扩展名的数组。例如：为了查找CoffeeScript 文件，数组中应该包含字符串`".coffee"`。

默认值：`["", ".webpack.js", ".web.js", ".js"]`

**`resolve.packageMains` - `package.json`中定义的主文件**

在`package.json`中查找符合字段文件

默认值：`["webpack", "browser", "web", "browserify", ["jam", "main"], "main"]`

**`resolve.packageAlias` - `package.json`中定义的别名**

在`package.json`中查询对象里的字段，键值对是按照这个别名定义来设置的。如：设置`'browser'`后会查找`browser`字段

默认此项未启用。

**`resolve.unsafeCache` - 非安全缓存**

缓存部分路径，启用有一定好处，但是是不安全的。

**`resolveLoader` - Loader解析路径设置**

和`resolve`很像，但用于Loader

```
// 默认:
{
  modulesDirectories: ["web_loaders", "web_modules", "node_loaders", "node_modules"],
  extensions: ["", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"],
  packageMains: ["webpackLoader", "webLoader", "loader", "main"]
}
```

**`resolveLoader-moduleTemplates` - 模块替代名**

这是`resolveLoader`唯一的属性。该设置描述了尝试使用的模块名称的替代名。

**`externals` - 设置非解析项**

该设置的指定项不会被Webpack解析，但是会成为打包文件的依赖项。`output.libraryTarget`选项指定了依赖类型

值可以是一个对象、字符串、函数、正则表达式，或数组：

*   字符串 - 一个精确匹配的依赖会变成`externals`依赖，同一字符串会被用于`externals`依赖。
*   对象 - 如果依赖精确匹配到了对象的一个属性，属性值就会被做为`externals`依赖。属性值可以包含一个依赖型的前缀，用一个空格隔开。如果属性值为`true`，则使用该属性名；如果属性值为`false`，外部测试会失败，因为这个依赖是内部依赖。
*   函数 - `function(context, request, callback(err, result))`。函数会在每个依赖中调用。如果结果被传递到回调函数里，这个值就会被像处理对象属性值那样处理。
*   正则表达式 - 每个被匹配的依赖都会成为外部依赖。匹配的文本会被用作外部依赖的请求。因为请求是用于生成外部代码钩子的确切代码，如果你匹配到一个CMD包(如：`'../some/package.js'`)，相反使用外部函数策略。你可以通过`callback(null, “require(‘” + request + “’)”`引入包，这个包生成`module.exports = require(‘../some/package.js’);`使用要求在Webpack上下文外。
*   数组 - 表示多个值(递归)

示例：

```
{
  output: { libraryTarget: "commonjs" },
  externals: [
    {
      a: false, // a is not external
      b: true, // b is external (require("b"))
            "./c": "c", // "./c" is external (require("c"))
            "./d": "var d" // "./d" is external (d)
      },
      // Every non-relative module is external
      // abc -> require("abc")
      /^[a-z\-0-9]+$/,
      function(context, request, callback) {
        // Every module prefixed with "global-" becomes external
        // "global-abc" -> abc
        if(/^global-/.test(request))
          return callback(null, "var " + request.substr(7));
        callback();
      },
      "./e" // "./e" is external (require("./e"))
    ]
}
```

| 类型 | 值 | 导入结果 |
| --- | --- | --- |
| “var” | `<span class="string">"abc"</span>` | `module.exports = abc;` |
| “var” | `<span class="string">"abc.def"</span>` | `module.exports = abc.def;` |
| “this” | `<span class="string">"abc"</span>` | `(<span class="function"><span class="keyword">function</span><span class="params">()</span> {</span> module.exports = <span class="keyword">this</span>[<span class="string">"abc"</span>]; }());` |
| “this” | `[<span class="string">"abc"</span>, <span class="string">"def"</span>]` | `(<span class="function"><span class="keyword">function</span><span class="params">()</span> {</span> module.exports = <span class="keyword">this</span>[<span class="string">"abc"</span>][<span class="string">"def"</span>]; }());` |
| “commonjs” | `<span class="string">"abc"</span>` | `module.exports = require(<span class="string">"abc"</span>);` |
| “commonjs” | `[<span class="string">"abc"</span>, <span class="string">"def"</span>]` | `module.exports = require(<span class="string">"abc"</span>).def;` |
| “amd” | `<span class="string">"abc"</span>` | `define([<span class="string">"abc"</span>], <span class="function"><span class="keyword">function</span><span class="params">(X)</span> {</span> module.exports = X; })` |
| “umd” | `<span class="string">"abc"</span>` | everything above |

**`target` - 编译环境**

设置最终运行/编译环境

*   `"web"` - 在浏览器中使用的编译环境（默认值）
*   `"webworker"` - 在WebWorker中编译
*   `"node"` - 在Node.js下编译(使用`require`加载分块)
*   `"async-node"` - 在Node.js下编译(用[fs](http://itbilu.com/nodejs/core/4y-N3wJS.html)和[vm](http://itbilu.com/nodejs/core/N1zOzlIO.html)异步加载)
*   `"node-webkit"` - 在WebKit下使用JSONP加载分块，也支持在Node中加入`require("nw.gui")`
*   `"electron"` - 为 Electron 编译

**`bail` - 报告硬性错误**

报告第一个错误为硬性错误，不可忽略。

**`profile` - 执行概况**

显示模块的执行时序概况信息

**`cache` - 启用缓存**

缓存生成的模块和分块，提高增量编译性能。启用`watch`模式后，该选项会自动启用，可以将其设置为`false`禁用。

**`watch` - 监控模式**

启用监控模式，该模式会在文件发生修改时自动重新编译

**`watchOptions.aggregateTimeout` - 设置监控频率**

设置监控频率，默认为`300`。该选项仅在CLI和Node.js API中适用。

**`watchOptions.poll` - 设置轮询间隔**

该选项仅在CLI和Node.js API中适用。

**`debug` - 启用调试模式**

启用Loader的调试模式

**`devtool` - 开发调试工具**

设置在调试中使用的开发工具

*   `eval` - 每个模块都用eval执行
*   `source-map` - 触发SourceMap，详情看`output.sourceMapFilename`
*   `hidden-source-map` - 同上，但不会在包中添加引用注释。
*   `inline-source-map` - SourceMap被作为`dataurl`加入到js文件中
*   `eval-source-map` - 每个模块都用eval执行，并且SourceMap被作为dataurl加入到eval中
*   `cheap-source-map` - 没有映射的SourceMap，Loaders的SourceMap不会启用。
*   `cheap-module-source-map` - 没有映射的SourceMap，SourceMap就简单的映射到每一行。

示例：

```
{
  devtool: "#inline-source-map"
}
// =>
//# sourceMappingURL=...
```

**`devServer` - 开发模式配置**

当配置用于[webpack-dev-server](https://github.com/webpack/webpack-dev-server)时，此选项用于配置`webpack-dev-server`的一些形为

```
{
  devServer: {
    contentBase: "./build",
  }
}
```

**`node` - Node设置**

此选项用于配置一些Node.js相关的设置

*   `console`：`true`或`false`
*   `global`：`true`或`false`
*   `process`：`true`、`"mock"`或`false`
*   `__filename`：`true`(真实文件名)、`"mock"`(`"/index.js"`)、或`false`
*   `__dirname`：`true`(真实目录名)、`"mock"`(`"/"`)、或`false`
*   `<node buildin>`：`true`(真实文件名)、`"mock"`、`"empty"`、或`false`

```
// Default:
{
  console: false,
  global: true,
  process: true,
  Buffer: true,
  __filename: "mock",
  __dirname: "mock",
  setImmediate: true
}
```

**`amd` - AMD配置**

设置`require.amd`和`define.amd`的值

例如：`amd:{jquery:true}`

**`loader` - Loader配置**

定义上下文中的Loader

**`recordsPath`，`recordsInputPath`，`recordsOutputPath` - 存储/读取编译器**

从一个JSON文件读取/设置编译器的状态，这会导致模块和分块ID的持久化

**`plugins` - 插件**

向编译器添加插件
