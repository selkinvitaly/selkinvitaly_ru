const path    = require('path');
const webpack = require('webpack');

const envs    = require('./environments');

const isWatch  = envs.isWatch;
const isDeploy = envs.isDeploy;


module.exports = function(root) {

    const options = {
        watch: isWatch,
        mode: 'none',
        context: root,
        entry: {
            app: ['./client/js/index'],
            vendor: [
                './client/js/polyfills/index',
                './client/js/vendor/blueimp-gallery',
                './client/js/vendor/blueimp-helper'
            ]
        },
        output: {
            path: path.resolve(root, './server/public/assets/js/'),
            filename: '[name].js',
            chunkFilename: '[name].js',
            publicPath: ''
        },
        devtool: isWatch ? 'module-inline-source-map' : false,
        plugins: [
            new webpack.NoEmitOnErrorsPlugin()
        ],

        optimization: {
            minimize: isDeploy,

            splitChunks: {
                cacheGroups: {
                    default: false,
                    vendors: false,
                    commons: {
                        test: (chunk) => {
                            const isNodeModules = /[\\/]node_modules[\\/]/.test(chunk.resource);
                            const isLocalVendor = /[\\/]client[\\/]js[\\/](polyfills|vendor)[\\/]/.test(chunk.resource);

                            return isNodeModules || isLocalVendor;
                        },
                        name: 'vendor',
                        reuseExistingChunk: true,
                        enforce: true,
                        chunks: 'all'
                    }
                }
            }
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }]
        }
    };

    return options;
};
