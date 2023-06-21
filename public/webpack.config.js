const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let config = {
    entry: {
        theme: [
            './js/theme.js',
            './css/theme.scss'
        ],
        theme_search: [
            './js/theme-search.js',
            './css/theme-search.scss'
        ],
    },
    output: {
        path: path.resolve(__dirname, './assets/js'),
        filename: '[name].js',
    },
    resolve: {
        preferRelative: true,
    },
    module: {
        rules: [
            {
                test: /\.js/,
                loader: 'esbuild-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: path.join('..', 'css', '[name].css')}),
        new webpack.SourceMapDevToolPlugin()
    ],
    devtool: 'source-map'
};

module.exports = config;
