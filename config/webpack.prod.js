const { merge } = require('webpack-merge');
const paths = require('./paths');
const base = require('./webpack.base.js');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清除build/dist文件夹文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // 压缩css
const TerserPlugin = require('terser-webpack-plugin'); // 压缩js

module.exports = merge(base, {
    mode: 'production',
    // devtool: 'source-map',
    devtool: 'hidden-source-map',
    output: {
        path: paths.build,
        filename: 'js/[name].[chunkhash].js', // js用chunkhash
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /\.(le|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: false,
                            modules: false
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|gif|ico|cur)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[chunkhash].[ext]', // 图片用hash
                            limit: 8192, // 8kb以下的图片使用base64编码，8kb以上的图片交给file-loader处理
                            outputPath: 'img',
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), '...']
    },
    performance: {
        hints: false, // 关闭性能提示
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
        // 清空dist文件夹
        new CleanWebpackPlugin({
            path: paths.build
        }),
        // 提取css
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css', //css用contenthash
            chunkFilename: '[id].css',
            ignoreOrder: true
        })
    ]
});
