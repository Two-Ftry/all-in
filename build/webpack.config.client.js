const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const baseConfig = require('./webpack.base.config');
const isProd = process.env.NODE_ENV === 'production';

const config = merge(baseConfig, {
    entry: {
        app: './src/entry-client.js'
    },
    output: {
        chunkFilename: isProd ? '[name].[chunkhash:6].js' : '[name].js'
    },
    module: {
        rules: [
        ]
    },
    plugins: [
        new VueSSRClientPlugin()
    ]
});

module.exports = config;