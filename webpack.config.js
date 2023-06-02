const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  mode: "development",
  entry: './src/components/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.(sass|css)$/, use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]}
    ]
    },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'template.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
           }),
           new FileManagerPlugin({
                  events: {
                    onStart: {
                      delete: ['dist'],
                    },
                  },
                }),
  ]
  
};