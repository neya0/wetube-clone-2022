const miniCssExtraPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
    entry: "./src/client/js/main.js",
    mode: 'development',
    plugins: [new miniCssExtraPlugin({
        filename: "css/style.css",
    })],
    output: {
        filename: "js/main.js",
        path: path.resolve(__dirname,"assets"),
        clean: true,
    },
    watch: true,
    module:{
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                          ['@babel/preset-env', { targets: "defaults" }]
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties']
                      }
                }
            },
            {
                test: /\.scss$/,
                use: [miniCssExtraPlugin.loader, "css-loader", "sass-loader"],
            }
        ]
    }
}