module.exports = {
    entry: './entry.js',
    output: {
        path: __dirname,
        filename: 'bundl.js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css'
        }]
    }
};