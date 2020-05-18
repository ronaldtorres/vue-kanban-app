const path = require('path'),
  MiniCSSExtractPlugin = require('mini-css-extract-plugin'),
  {
    VueLoaderPlugin
  } = require('vue-loader'),
  {
    HotModuleReplacementPlugin
  } = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: ["babel-polyfill", path.resolve(__dirname, 'client/js/main.js')]
  },

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    hotUpdateChunkFilename: 'hot-update/hot-update.js',
    hotUpdateMainFilename: 'hot-update/hot-update.json'
  },

  module: {
    rules: [{
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(s[a|c]ss|css)$/,
        use: [{
            loader: MiniCSSExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          // 'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader'
      }
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new HotModuleReplacementPlugin(),
    new MiniCSSExtractPlugin({
      filename: "app.css",
    }),
    // new HtmlWebpackPlugin({
    //   showErrors: true,
    //   title: 'html-webpack output',
    //   template: path.join(__dirname, 'public/js/index.html'),
    //   //favicon: path.join(__dirname, 'favicon.ico'),
    // })
  ],

  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    ignored: ['controllers', 'db', 'public', 'views', 'models', 'routes', 'node_modules']
  }
}