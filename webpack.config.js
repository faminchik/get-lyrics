require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('mini-css-extract-plugin');
const { clientSidePort: port } = require('./src/shared/constants/common');

module.exports = {
    entry: './src/client/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [ExtractTextPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: [ExtractTextPlugin.loader, 'css-loader']
            }
        ]
    },
    devtool: 'eval-sourcemap',
    devServer: {
        port,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ExtractTextPlugin('styles.css'),
        new webpack.DefinePlugin({
            'process.env': {
                HOST_URL: JSON.stringify(process.env.HOST_URL)
            }
        })
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx', '.scss']
    }
};
