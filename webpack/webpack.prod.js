const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require("path");
module.exports = merge(common,{
    mode:"production",
    output:{
        path: path.resolve(__dirname,"..", 'dist'),
        filename: 'scripts/index.[name].min.js',
        library:"JsObj",
        libraryTarget: 'umd',
        libraryExport: 'default',
    },  
    plugins:[
        new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin()
    ],
})