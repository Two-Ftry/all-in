/**
 * Created by jfhuang on 18/1/20.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
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
        })
    ]
};


module.exports = config;