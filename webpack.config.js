require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('mini-css-extract-plugin');
const { clientSidePort: port } = require('./src/shared/constants/common');

module.exports = {
    entry: './src/client/index',
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
                test: /\.(ts|js)x?$/,
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
    devtool: 'eval-source-map',
    devServer: {
        port,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ExtractTextPlugin({ filename: 'styles.css' }),
        new webpack.DefinePlugin({
            'process.env': {
                HOST_URL: JSON.stringify(process.env.HOST_URL)
            }
        })
    ],
    resolve: {
        extensions: ['*', '.ts', '.tsx', '.js', '.jsx', '.scss']
    }
};
