const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PROXY_MAP = require('./config/path');

module.exports = (env = {}) => {
    console.log('env:', env);
    const devMode = env.mode !== 'production';
    const proxy = env.proxy || 'dev';
    const configPath = env.spec === 'semantic' ? 'src/config/semantic/' : 'src/config/';
    return {
        entry: {
            index: './src/index.js'
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            globalObject: 'this',
            publicPath: '/'
        },
        module: {
            noParse: [/moment.js/],
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/preset-env']
                    }
                },
                {
                    test: /\.(le|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: process.env.NODE_ENV === 'development'
                            }
                        },
                        'css-loader',
                        'less-loader'
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif|ico|obj|mtl|cur)(\?v=\d+\.\d+\.\d+)?$/i,
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }
            ]
        },
        resolve: {
            modules: ['node_modules/'],
            alias: {
                src: path.resolve(__dirname, 'src/'),
                demo: path.resolve(__dirname, 'demo/'),
                less: path.resolve(__dirname, 'src/asset/less/'),
                config: path.resolve(__dirname, configPath)
            },
            extensions: ['.js', '.jsx', '.json']
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './public/index.html'),
                filename: 'index.html',
                inject: true,
                favicon: path.resolve(__dirname, './public/favicon.ico'),
                templateParameters: {
                    PUBLIC_URL: __dirname
                }
            }),
            new CleanWebpackPlugin(),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                THREE: 'three'
            }),
            new MiniCssExtractPlugin({
                filename: devMode ? 'main.css' : 'main.[hash].css',
                chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
            }),
            new CopyWebpackPlugin([
                //支持输入一个数组
                {
                    from: path.resolve(__dirname, 'config'), //将config下的文件
                    to: './config' // 复制到config
                }
            ]),
            new webpack.DefinePlugin({
                DATA_SPEC: JSON.stringify(env.spec),
                CSYS: env.csys,
                NOSHP: env.noshp
            })
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.(le|c)ss$/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        },
        node: {
            fs: 'empty'
        },
        stats: {
            children: false,
            warnings: false
        },
        devtool: 'source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            port: 15900,
            host: '0.0.0.0',
            proxy: {
                '/gateway/auth': {
                    target: PROXY_MAP[proxy].gateway,
                    pathRewrite: { '^/gateway/auth': '/auth' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/gateway/task': {
                    target: PROXY_MAP[proxy].task,
                    pathRewrite: { '^/gateway/task': '/task' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/gateway/imppublic': {
                    target: PROXY_MAP[proxy].id,
                    pathRewrite: { '^/gateway/imppublic': '/imppublic' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/gateway/manualBuild': {
                    target: PROXY_MAP[proxy].manualBuild,
                    pathRewrite: { '^/gateway/manualBuild': '/manualBuild' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/gateway/store': {
                    target: PROXY_MAP[proxy].store,
                    pathRewrite: { '^/gateway/store': '/store' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/gateway/querydb_new': {
                    target: PROXY_MAP[proxy].querydb,
                    pathRewrite: { '^/gateway/querydb_new': '/querydb_new' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/gateway/edit': {
                    target: PROXY_MAP[proxy].edit,
                    pathRewrite: { '^/gateway/edit': '/edit' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/gateway/check-web': {
                    target: PROXY_MAP[proxy].checkMarker,
                    pathRewrite: { '^/gateway/check-web': '/check-web' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/gateway/check': {
                    target: PROXY_MAP[proxy].check,
                    pathRewrite: { '^/gateway/check': '/check' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/gateway/correct': {
                    target: PROXY_MAP[proxy].repair,
                    pathRewrite: { '^/gateway/correct': '/correct' },
                    changeOrigin: true,
                    logLevel: 'debug'
                },
                '/gateway/collect': {
                    target: PROXY_MAP[proxy].buriedPoint,
                    pathRewrite: { '^/gateway/collect': '/collect' },
                    changeOrigin: true,
                    logLevel: 'debug'
                }
            }
        }
    };
};
