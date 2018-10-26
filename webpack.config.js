const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('mini-css-extract-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
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
        // new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ExtractTextPlugin('styles.css')
    ]
};
