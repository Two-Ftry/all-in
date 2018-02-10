const path = require('path');

const config = {
    entry: {
        // app: [path.resolve(__dirname, '../src/entry-client.js')]
        app: ['./src/entry-client.js']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[chunkhash:6].js',
        chunkFilename: '[name].[chunkhash:6].[ext]'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                      less: 'vue-style-loader!css-loader!less-loader', // <style lang="less">
                    }
                }
            }
        ]
    }
};


module.exports = config;