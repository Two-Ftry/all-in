/**
 * Created by jfhuang on 18/1/20.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: '[name].[chunkhash:6].js',
        chunkFilename: '[name].[chunkhash:6].js'
    },
    resolve: {
        alias: {
            // 'vue': 'vue/dist/vue.js'
            'vue$': 'vue/dist/vue.esm.js' 
        }
    },
    module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: 'babel-loader'
          },
          {
              test: /\.css$/,
              exclude: /node_modules/,
              use: [
                  'style-loader',
                  'css-loader'
              ]
          },
          {
              test: /\.vue$/,
              exclude: /node_modules/,
              use: 'vue-loader'
          }
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html'
        }),
        new UglifyJsPlugin()
    ]
};


module.exports = config;