const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

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
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              configFile: path.resolve(__dirname, './.eslintrc'),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/,
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
      {
        test: /\.vue$/,
        use: [
          'vue-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 4000,
          name: 'images/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        // query: {
        //   limit: 5000,
        //   name: 'fonts/[name].[hash:8].[ext]',
        // },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
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
