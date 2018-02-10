const path = require('path');

const config = {
    entry: {
        // app: [path.resolve(__dirname, '../src/entry-client.js')]
        app: ['../src/entry-client.js']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hashchunk:6].js',
        chunkName: '[name].[hashchunk:6].[ext]'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};


module.exports = config;