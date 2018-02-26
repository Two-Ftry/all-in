const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const appConfig = require('../config/');

const config = {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: isProd ? '[name].[chunkhash:6].js' : '[name].js',
        publicPath: `/${appConfig.name}/dist/`
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader', 'eslint-loader']
            },
            {
                enforce: 'pre',
                test: /\.vue$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less: 'vue-style-loader!css-loader!less-loader'// <style lang="less">
                    }
                }
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    }
};

if (!isProd) {
    config.devtool = 'source-map';
}

module.exports = config;