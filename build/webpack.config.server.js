const path = require('path');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const isDev = !(process.env.NODE_ENV === 'production');

const config = {
    entry: {
        app: './src/entry-server.js'
    },
    target: 'node',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: isDev ? '[name].js' : '[name].[chunkhash:6].js',
        chunkFilename: isDev ? '[name].js' : '[name].[chunkhash:6].js',
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

if (isDev) {
    config.devtool = 'source-map';
}

module.exports = config;