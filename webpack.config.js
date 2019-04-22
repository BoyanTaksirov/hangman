var webpack = require("webpack");
var path = require("path");

var DIST_DIR = path.resolve(__dirname, "public");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
    entry: SRC_DIR + "/js/main.js",
    output: {
        path: DIST_DIR,
        filename: "HangmanBundle.js",
        publicPath: "./",
    },
    //devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: [
                        "@babel/preset-env"
                    ],
                    plugins: ["@babel/plugin-proposal-class-properties"]
                }
            },
            {
                test: /\.woff$/,
                use:{
                    loader: 'url-loader',
                    options: {              
                        limit: 50000,               
                        mimetype: "application/font-woff",
                        name: "./assets/fonts/[name].[ext]",
                    }
              }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
        ]
    },

    optimization: {
        minimize: true,
    }

};

module.exports = config;