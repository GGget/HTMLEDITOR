const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require("path");
const common = require('./webpack.common');
const SSICompileWebpackPlugin = require('ssi-webpack-plugin');

module.exports = merge(common,{
    mode:"development",
    devtool:"cheap-module-eval-source-map",
    devServer: {
        contentBase: ["./dist"],
        hot: true,
        watchContentBase: true,
        openPage: "./pc.html",
        port: 8087,
        host:"t.gl.lenovouat.com"
    },
    plugins:[
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new SSICompileWebpackPlugin({
            remoteBasePath:"https://h1-ofp.lenovouat.com",
            minify: false
        })
    ],
    watchOptions: {
        ignored: /node_modules/
    }
})