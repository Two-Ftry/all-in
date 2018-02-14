const path = require('path');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const isProd = process.env.NODE_ENV === 'production';

const config = {
    // entry: {
    //     main: './src/entry-server.js'
    // },
    entry: './src/entry-server.js',
    target: 'node',
    output: {
        path: path.resolve(__dirname, '../dist'),
        // filename: isProd ? '[name].[chunkhash:6].js' : '[name].js',
        filename: 'server-bundle.js',
        // chunkFilename: isProd ? '[name].[chunkhash:6].js' : '[name].js',
        publicPath: '/dist/',
        libraryTarget: 'commonjs2'
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
    },
    plugins: [
        new VueSSRServerPlugin()
    ]
};

if (!isProd) {
    config.devtool = 'source-map';
}

module.exports = config;