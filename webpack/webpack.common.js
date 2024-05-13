const path = require("path");
const argv = require('yargs-parser')(process.argv.slice(2));
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    context: path.resolve(__dirname, ".."),
    entry: {
        pc: './src/entry/pc.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'scripts/[name].[hash].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.(c|sc|sa)ss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModules: true,
                            hmr: argv.mode == 'development',
                            reloadAll: true,
                        }
                    },
                    "css-loader",
                    "resolve-url-loader",
                    "sass-loader"
                ],
                sideEffects:true
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                use:{
                    loader: "file-loader",
                    options:{
                        name:'[name].[ext]',
                        outputPath:"/fonts"
                    }
                }
            }
        ]
    },
    resolve: {
        alias: {
            "@css": path.resolve(__dirname,'..','src/scss'),
            "@common":path.resolve(__dirname,'..','..','..','..','common'),
            "@js": path.resolve(__dirname,'..','src/js'),
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            $PRODUCTION: argv.mode == 'production',
        }),
        new HtmlWebpackPlugin({
            title: 'test title',
            filename: 'pc.html',
            template: './src/html/pc.html',
            chunks:['pc','runtime','vendors'],
            minify:false
        }),
        // new HtmlWebpackPlugin({
        //     title: 'test title',
        //     filename: 'tablet.html',
        //     template: './src/html/tablet.html',
        //     chunks:['tablet','runtime','vendors'],
        //     minify:false
        // }),
        // new HtmlWebpackPlugin({
        //     title: 'test title',
        //     filename: 'mobile.html',
        //     template: './src/html/mobile.html',
        //     chunks:['mobile','runtime','vendors'],
        //     minify:false
        // }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css'
        })
    ],
}

