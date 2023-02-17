const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

require('dotenv').config();
const isProduction = process.env.IS_PRODUCTION;

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'index.ts'),
  output: {
    path: __dirname,
    filename: 'index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.html',
      favicon: './public/logo.svg',
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|\.test.ts$)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.scss$/i,
        use: [
          isProduction === 'true' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    open: true,
    hot: true,
    port: 3000,
  },
};
