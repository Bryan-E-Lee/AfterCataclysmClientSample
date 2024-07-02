const path = require('path');
const package = require('./package.json');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
    const devMode = options.mode === 'development' ? true : false;
    process.env.NODE_ENV = options.mode;

    const commonConfig = {
        devtool: 'source-map',
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
        },
        performance: {
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.ttf?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: [
                        {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/font-ttf'
                        }
                        }
                    ]
                },
                {
                    test: /\.(css|scss|sass)$/,
                    include: path.resolve(__dirname, 'src'),
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                url: false
                            }
                        }, 
                        {
                            loader: 'postcss-loader',
                            options: {
                              sourceMap: true
                            }
                        },
                        {
                            loader: 'resolve-url-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                              sourceMap: true,
                              sassOptions: {
                                includePaths: [path.resolve(__dirname, './src')]
                              }
                            }
                        }
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|ttf|eot)$/,
                    loader: "file-loader",
                    options: {
                        name: "[path][name].[ext]"
                    }
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: "file-loader",
                    options: {
                        name: "[path][name].[ext]"
                    }
                },
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: devMode ? '[name].css' : '[name].[contenthash].css',
                chunkFilename: devMode ? '[name].css' : '[name].[contenthash].css',
            }),
            // copy static files from public folder to build directory
            new CopyPlugin({
                patterns: [
                    { 
                        from: "public/**/*", 
                        globOptions: {
                            ignore: ["**/index.html"],
                        },
                    }
                ],
            }),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: 'index.html',
                title: package.title,
                meta: {
                    title: package.title,
                    description: package.description,
                    author: package.author,
                    keywords: Array.isArray(package.keywords) 
                        ? package.keywords.join(',') 
                        : undefined,
                    'og:title': package.name,
                    'og:description': package.description,
                    'og:url': package.homepage,
                },
                minify: {
                    html5                          : false,
                    collapseWhitespace             : true,
                    minifyCSS                      : true,
                    minifyJS                       : true,
                    minifyURLs                     : false,
                    removeComments                 : true,
                    removeEmptyAttributes          : true,
                    removeOptionalTags             : false,
                    removeRedundantAttributes      : true,
                    removeScriptTypeAttributes     : true,
                    removeStyleLinkTypeAttributese : true,
                    useShortDoctype                : true
                }
            }),
            !devMode ? new CleanWebpackPlugin() : false,
            !devMode ? new BundleAnalyzerPlugin() : false
        ].filter(Boolean),
        optimization: {
            splitChunks: {
                cacheGroups: {
                    default: false,
                    vendors: false,
                    // vendor chunk
                    vendor: {
                        // sync + async chunks
                        chunks: 'all',
                        name: 'vendor',
                        // import file path containing node_modules
                        test: /node_modules/
                    }
                }
            },
            minimizer: [
                new TerserPlugin({
                    extractComments: true,
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        }
                    }
                }), 
                new CssMinimizerPlugin()
            ]
        },
    };

    const appConfig = {
        name: 'app',
        ...commonConfig,
        entry: path.resolve(__dirname, './src/index.tsx'),
        devServer: {
            contentBase: path.join(__dirname, './dist'),
            compress: true,
            port: 5555,
            historyApiFallback: true
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            publicPath: '/',
            filename: '[name].[contenthash].js',
            chunkFilename: '[name].[contenthash].js',
        }
    };

    const adminConfig = {
        name: 'admin',
        ...commonConfig,
        entry: path.resolve(__dirname, './src/Admin/index.tsx'),
        devServer: {
            contentBase: path.join(__dirname, './src/Admin/dist'),
            compress: true,
            port: 4444,
            historyApiFallback: true
        },
        output: {
            path: path.resolve(__dirname, './src/Admin/dist'),
            publicPath: '/',
            filename: '[name].[contenthash].js',
            chunkFilename: '[name].[contenthash].js',
        }
    };

    return [appConfig, adminConfig];
};

module.exports.parallelism = 2;