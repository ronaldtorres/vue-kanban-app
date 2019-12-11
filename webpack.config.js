const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'client/js/main.js')
    },

    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'index.js',
        hotUpdateChunkFilename: 'hot-update/hot-update.js',
        hotUpdateMainFilename: 'hot-update/hot-update.json'
    },

    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules'),
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(s[a|c]ss|css)$/,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            publicPath: path.resolve(__dirname, 'public/css'),
                            //hmr: process.env.NODE_ENV === 'development',
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
        new(require('vue-loader').VueLoaderPlugin)(),
        new(require('webpack').HotModuleReplacementPlugin)(),
        new MiniCSSExtractPlugin({
            filename: "app.css",
        })
        //new (require('html-webpack-plugin'))({
        //  showErrors: true,
        //cache: true,
        //title: '',
        //template: path.join(__dirname, 'index.html'),
        //favicon: path.join(__dirname, 'favicon.ico'),
        //})
    ],

    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        ignored: ['controllers', 'db', 'public', 'views', 'models', 'routes', 'node_modules']
    }
}