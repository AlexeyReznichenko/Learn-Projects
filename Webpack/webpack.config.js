const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
// const MinifyHtmlWebpackPlugin = require('minify-html-webpack-plugin')
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
// const CompressionPlugin = require("compression-webpack-plugin")
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")

const isDev = process.env.NODE_ENV === 'development'
// const isProd = !isDev

const babelOptions = preset => {
    const options = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        options.presets.push(preset)
    }

    return options
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]

    if (isDev) {
        loaders.push('eslint-loader')
    }

    return loaders
}

const plugins = () => {
    const base = [
        // new MinifyHtmlWebpackPlugin({
        //     src: './',
        //     dest: '../dist',
        //     rules: {
        //         // collapseBooleanAttributes: true,
        //         collapseWhitespace: true,
        //         removeAttributeQuotes: true,
        //         removeComments: true,
        //         minifyJS: true,
        //     }
        // }),
        // new CopyWebpackPlugin({
        //     patterns: [{
        //         from: path.resolve(__dirname, 'src/favicon.ico'),
        //         to: path.resolve(__dirname, 'dist')
        //     }]
        // }),
        // new CompressionPlugin(),
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        }),
    ]

    if (!isDev) {
        base.push(new BundleAnalyzerPlugin())
    } 

    return base
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['@babel/polyfill', './js/index.jsx'],
        analytics: './js/analytics.ts'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[name][ext]'
    },
    resolve: {
        extensions: ['.js', '.json', '.css'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
            new HtmlMinimizerPlugin(),
            new TerserPlugin()
        ]
    },
    devServer: {
        port: 4200,
        open: true,
        hot: isDev
    },
    // devtool: isDev ? 'source-map' : '',
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader" ,'less-loader'],
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader" ,'sass-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript')
                }]
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react')
                }]
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                // loader: "file-loader",
                type: 'asset/resource',
                // options: {
                //     name: 'images/[name].[ext]',
                // },
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource'
            },
            {
                test: /\.xml$/,
                loader: "xml-loader",
            },
            {
                test: /\.csv$/,
                loader: "csv-loader",
            },
        ]
    }
}