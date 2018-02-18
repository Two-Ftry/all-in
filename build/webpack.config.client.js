const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const webpack = require('webpack');

const baseConfig = require('./webpack.base.config');
const isProd = process.env.NODE_ENV === 'production';

const config = merge(baseConfig, {
    entry: {
        app: './src/entry-client.js',
        d3: ['d3'] // 结合CommonsChunkPlugin,打包成单独的d3.js包
        // vendors: ['vue', 'vuex', 'vue-router'] // 结合CommonsChunkPlugin,打包成单独的vendors.js包
    },
    output: {
        chunkFilename: isProd ? '[name].[chunkhash:6].js' : '[name].js'
    },
    module: {
        rules: [
        ]
    },
    plugins: [
        new VueSSRClientPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'd3',
            chunks: ['d3', 'app']
        }),
        // 将app入口中多次使用的模块打包成vendors.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            chunks: ['app'],
            minChunks (module, count) {
                return (
                    /node_modules/.test(module.context) &&
                    !/\.css$/.test(module.request)
                )
            }
        }),
        // 将webpack的bootstrap逻辑单独打包出来称为manifest.js文件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        })
    ]
});

module.exports = config;