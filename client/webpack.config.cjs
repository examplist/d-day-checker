const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'index.ts'),
  output: {
    path: __dirname,
    filename: 'index.js',
  },
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
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
};
