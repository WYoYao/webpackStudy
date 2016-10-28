var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'bulid'),
    entry: {
        entry:'./entry.js', 
        entry1:'./entry1.js'
    },
    output: {
        path: path.resolve(__dirname, 'app'),
        // 这里的[name] 对应的是 entry 对应的键值,并不一定的对应的是文件的名称
        filename: '[name].js',
        // 设置浏览器中的访问路径
        publicPath: '/virtualpath/',

    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css'
        }]
    },
    plugins: [
        new webpack.BannerPlugin('这是一个注释')
    ]
};



