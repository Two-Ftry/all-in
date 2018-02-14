const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = !(process.env.NODE_ENV === 'production');

const config = {
    entry: {
        app: ['./src/entry-client.js']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: isDev ? '[name].js' : '[name].[chunkhash:6].js',
        chunkFilename: isDev ? '[name].[ext]' : '[name].[chunkhash:6].js',
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
            }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, '../src/index.template.html')
        // }),
        // 此插件在输出目录中
        // 生成 `vue-ssr-client-manifest.json`。
        new VueSSRClientPlugin()
    ]
};

if (isDev) {
    config.devtool = 'source-map';
    config.devServer = {
        contentBase: './dist',
        port: '30007'
    };
}


module.exports = config;