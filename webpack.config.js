const path = require('path');

module.exports = {
    entry: {
        popup: './js/popup.js',
        background: './js/background.js',
        contentScript: './js/contentScript.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: path.join(__dirname, ""),
        publicPath: '/dist/',
        watchContentBase: true,
        compress: true,
        port: 3009,
        open: true,
        hot: true,
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                options: {
                    configFile: path.resolve(__dirname, './.eslintrc'),
                },
                loader: "eslint-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ],
    },
};