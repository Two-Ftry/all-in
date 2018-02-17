const merge = require('webpack-merge');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const baseConfig = require('./webpack.base.config');
// const isProd = process.env.NODE_ENV === 'production';

const config = merge(baseConfig, {
    entry: './src/entry-server.js',
    target: 'node',
    output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
        ]
    },
    plugins: [
        new VueSSRServerPlugin()
    ]
});

module.exports = config;