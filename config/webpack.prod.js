const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    main: ['./src/client/main.js'],
  },
  mode: 'production',
  output: {
    filename: 'scripts/[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src'],
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|jpeg|.ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'imgs/',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'svg/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OptimizeCssAssetsPlugin(),
    new MiniCSSExtractPlugin({
      filename: 'styles/[name].css',
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
    }),
  ],
  externals: {
    jquery: 'jQuery',
  },
};
