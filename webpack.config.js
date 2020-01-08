const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : 'none',
  entry: {
    popup: './js/popup.js',
    background: './js/background.js',
    contentScript: './js/contentScript.js',
  },
  output: {
    filename: './scripts/[name].js',
    path: path.resolve(__dirname, 'ym-sycm-plugin'),
  },
  devServer: {
    contentBase: path.join(__dirname, ''),
    publicPath: '',
    watchContentBase: true,
    compress: true,
    port: 3009,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, './.eslintrc'),
        },
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      {
        from: 'manifest.json',
        to: '',
      },
      {
        from: 'background.html',
        to: '',
      },
      {
        from: 'popup.html',
        to: '',
      },
      {
        from: 'icons',
        to: 'icons',
      },
      {
        from: 'images',
        to: 'images',
      },
    ]),
  ],
};
