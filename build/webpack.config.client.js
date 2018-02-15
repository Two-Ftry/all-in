const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const isProd = process.env.NODE_ENV === 'production';

const config = {
    entry: {
        app: './src/entry-client.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: isProd ? '[name].[chunkhash:6].js' : '[name].js',
        chunkFilename: isProd ? '[name].[chunkhash:6].js' : '[name].js',
        publicPath: '/dist/'
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
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new VueSSRClientPlugin()
    ]
};

if (!isProd) {
    config.devtool = 'source-map';
}

module.exports = config;