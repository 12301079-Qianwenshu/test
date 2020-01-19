const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    //设置人口文件的绝对路径
    entry: ["babel-polyfill", path.resolve("src/index.jsx")],
    output: {
        filename: "bundle.[hash:8].js",
        path: path.resolve("./dist")
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: [/\.css$/, /\.scss$/],
                exclude: [/node_modules/, path.resolve(__dirname, "./src/static/scss")],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    localIdentName: '[local]_[hash:5]'
                                },
                                importLoaders: 2,
                                sourceMap: true
                            }
                        },
                        "postcss-loader",
                        "sass-loader"
                    ]
                })
            },
            {
                test: [/\.css$/, /\.scss$/],
                include: [path.resolve(__dirname, "./src/static/scss")],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 2,
                                sourceMap: true
                            }
                        },
                        "postcss-loader",
                        "sass-loader"
                    ]
                })
            },
            {
                test: [/\.css$/],
                exclude: [/src/],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1,
                                sourceMap: true
                            }
                        },
                        "postcss-loader"
                    ]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: "url-loader?limit=8192"
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf)$/,
                loader: "url-loader?limit=8192"
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".scss", "json"],
        alias: {
            'resource': path.resolve("./src/util/resource.js"),
            'static': path.resolve("./src/static"),
            'utils': path.resolve("./src/util/utils.js"),
            'service': path.resolve("./src/service"),
            'components': path.resolve("./src/components"),
            'containers': path.resolve("./src/containers"),
            'constants': path.resolve("./src/constants"),
            'reduxs': path.resolve("./src/redux"),
            'api': path.resolve("./src/api/index.js"),
            'libs': path.resolve("./src/libs")
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: path.resolve("./src/static/images/favicon.ico"),
            template: './src/index.html'

        }),
        new ExtractTextPlugin("bundle.[hash:8].css")
    ]
};